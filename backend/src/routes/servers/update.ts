import { FromSchema } from 'json-schema-to-ts';
import { FastifyInstance } from 'fastify';

const schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      ip: { type: 'string' },
      port: { type: 'string' },
      telegram: { type: 'string' },
      discord: { type: 'string' },
      youtube: { type: 'string' },
      link: { type: 'string' },
      description: { type: 'string' }
    }
  }
} as const;

// https://discord.com/api/oauth2/authorize?client_id=1078782002704175156&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&response_type=code&scope=identify

export default async (server: FastifyInstance) =>
  server.put<{ Body: FromSchema<typeof schema.body>; Params: { id: string } }>(
    '/:id',
    { schema, onRequest: server.auth() },
    async (req, reply) => {
      const serverDB = await server.db.server.findFirst({
        where: {
          id: Number.parseInt(req.params.id),
          user: {
            id: req.user.id
          }
        }
      });
      if (!serverDB) return reply.code(400).send(new Error('Invalid server id or access denied'));
      await server.db.server
        .update({
          data: { ...req.body, user: { connect: { id: req.user.id } } },
          where: {
            id: Number.parseInt(req.params.id)
          }
        })
        .then(() => reply.send())
        .catch(e => reply.sendError(e));
    }
  );
