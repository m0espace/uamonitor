import type { PageLoad } from '../$types';
import { dev, browser } from '$app/environment';
import api from '$lib/api';
import type { GraphServer, ParsedServer, Server } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  const servers = await api()
    .polyfills({ fetch })
    .url(
      dev
        ? 'http://127.0.0.1:8080/api/graph'
        : `${browser ? '' : 'http://stats.m0e.space'}/api/graph`,
      true
    )
    .get()
    .badRequest(e => ({ error: e, status: 500 }))
    .json<GraphServer[]>();

  const serversData = await Promise.all(
    servers.map((server: GraphServer, i: number) =>
      api()
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
        .then(serverData => ({ ...serverData, graph: servers[i] }))
    )
  );
  return { servers: serversData as ParsedServer[] };
};
