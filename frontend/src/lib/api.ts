import wretch from 'wretch';
import type { Wretcher, WretcherError } from 'wretch';
import { dev, browser } from '$app/environment';
import auth, { type AuthData } from './auth';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

const handleError = (err: WretcherError) =>
    browser && alert(err.json.message || err.json.error || err.message),
  api = wretch(dev ? 'http://127.0.0.1:8080/api/' : '/api/')
    .options({ credentials: 'include' })
    .errorType('json')
    .resolve(res => res.badRequest(handleError).internalError(handleError));

// eslint-disable-next-line one-var
export const logOut = (): Promise<void> =>
    api
      .url('auth/logout')
      .post()
      .res()
      .then(() => {
        auth.set(null);
        goto('/');
      }),
  refreshToken = (): Promise<void> =>
    api
      .url('auth/refresh_token')
      .post()
      .json<{ error?: string; access_token?: string }>()
      .then(json => auth.set(!json.error && json.access_token ? (json as AuthData) : null));

export default (withAuth = false) =>
  withAuth
    ? api
        .resolve(res =>
          res.forbidden(async (_err, req) => {
            await refreshToken();
            return (req as Wretcher)
              .options({ method: req._options.method })
              .auth(`Bearer ${get(auth)?.access_token}`)
              .resolve(res => res.forbidden(logOut));
          })
        )
        .auth(`Bearer ${get(auth)?.access_token}`)
    : api;
