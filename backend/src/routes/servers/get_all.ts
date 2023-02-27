import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get('/', (req, reply) =>
    server.db.server
      .findMany({
        include: {
          user: {
            select: {
              id: true
            }
          }
        }
      })
      .then(srv => reply.send(srv))
  );
