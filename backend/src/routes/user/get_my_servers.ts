import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get('/servers', { onRequest: server.auth() }, (req, reply) =>
    server.db.server
      .findMany({
        where: {
          user: {
            id: req.user.id
          }
        }
      })
      .catch(e => reply.sendError(e))
      .then(servers => reply.send(servers))
  );
