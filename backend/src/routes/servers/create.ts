import { FromSchema } from 'json-schema-to-ts';
import { FastifyInstance } from 'fastify';

const schema = {
  body: {
    type: 'object',
    required: ['name', 'ip', 'port'],
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
  server.post<{ Body: FromSchema<typeof schema.body> }>(
    '/',
    { schema, onRequest: server.auth() },
    (req, reply) =>
      server.db.server
        .create({
          data: { ...req.body, user: { connect: { id: req.user.id } } }
        })
        .then(serverDB => reply.send(serverDB))
        .catch(e => reply.sendError(e))
  );
