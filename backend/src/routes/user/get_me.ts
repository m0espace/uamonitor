import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get('/', { onRequest: server.auth() }, (req, reply) =>
    server.db.user
      .findFirst({
        where: {
          id: req.user.id
        }
      })
      .catch(e => reply.sendError(e))
      .then(user => reply.send(user))
  );
