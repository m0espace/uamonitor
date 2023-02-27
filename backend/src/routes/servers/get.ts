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
