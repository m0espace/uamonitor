import { FromSchema } from 'json-schema-to-ts';
import { FastifyInstance } from 'fastify';

const schema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  }
} as const;

// https://discord.com/api/oauth2/authorize?client_id=1078782002704175156&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&response_type=code&scope=identify

export default async (server: FastifyInstance) =>
  server.put<{ Body: FromSchema<typeof schema.body> }>(
    '/',
    { schema, onRequest: server.auth() },
    (req, reply) =>
      server.db.user
        .update({
          where: { id: req.user.id },
          data: {
            discordName: req.body.name
          }
        })
        .then(() => reply.send())
        .catch(e => reply.sendError(e))
  );
