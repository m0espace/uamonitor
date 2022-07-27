import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get('/', (req, reply) =>
    server.db.server
      .findMany({
        select: {
          id: true,
          name: true,
          ip: true,
          port: true,
          icon: true,
          link: true,
          discord: true,
          telegram: true,
          youtube: true,
          statuses: {
            orderBy: {
              date: 'desc'
            },
            take: 1,
            select: {
              date: true,
              isOnline: true,
              onlineCount: true,
              maxOnline: true,
              version: true
            }
          }
        }
      })
      .then(srv => reply.send(srv))
  );
