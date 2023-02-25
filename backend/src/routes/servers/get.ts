import { FastifyInstance } from 'fastify';

const schema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number'
      }
    }
  }
};

export default async (server: FastifyInstance) =>
  server.get<{ Params: { id: number } }>('/:id', { schema }, (req, reply) =>
    server.db.server
      .findFirst({
        where: {
          id: req.params.id
        },
        select: {
          id: true,
          name: true,
          description: true,
          ip: true,
          port: true,
          icon: true,
          link: true,
          discord: true,
          telegram: true,
          youtube: true,
          user: {
            select: {
              id: true
            }
          },
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
