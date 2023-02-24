import { FastifyInstance } from 'fastify';

const schema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
};

export default async (server: FastifyInstance) =>
  server.get<{ Params: { id: string } }>('/:id', { schema }, async (req, reply) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(' ')[1] !== process.env.TELEGRAM_BOT_SECRET
    )
      return reply.code(403).send(new Error('Forbidden'));
    const user = await server.db.user.findFirst({
      where: {
        id: req.params.id
      }
    });
    if (!user) return reply.code(400).send(new Error('Invalid user'));
    reply.send(user);
  });
