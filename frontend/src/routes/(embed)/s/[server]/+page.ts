import type { PageLoad } from './$types';
import { dev, browser } from '$app/environment';
import api from '$lib/api';
import type { GraphServer, ParsedServer, Server } from '$lib/types';

export const load: PageLoad = async ({ fetch, params, url }) => {
  const server = await api()
    .polyfills({ fetch })
    .url(
      dev
        ? `http://127.0.0.1:8080/api/graph/${params.server}`
        : `${browser ? '' : 'http://stats.m0e.space'}/api/graph/${params.server}`,
      true
    )
    .get()
    .badRequest(e => ({ error: e, status: 500 }))
    .json<GraphServer>();

  const serverData = await api()
    .polyfills({ fetch })
    .url(
      dev
        ? `http://127.0.0.1:8080/api/servers/${server.id}`
        : `${browser ? '' : 'http://stats.m0e.space'}/api/servers/${server.id}`,
      true
    )
    .get()
    .badRequest(e => ({ error: e, status: 500 }))
    .json<Server>()
    .then(data => ({ ...data, graph: server }));

  return {
    server: serverData as ParsedServer,
    size: { height: url.searchParams.get('height'), width: url.searchParams.get('width') }
  };
};
