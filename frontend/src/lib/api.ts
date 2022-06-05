import wretch from 'wretch';
import type { Wretcher, WretcherError } from 'wretch';
import { dev, browser } from '$app/env';

const handleError = (err: WretcherError) =>
	browser && alert(err.json.message || err.json.error || err.message);

export default (): Wretcher =>
	wretch(dev ? 'http://localhost:8080/api/' : '/api/')
		.errorType('json')
		.resolve((res) => res.badRequest(handleError).internalError(handleError));
