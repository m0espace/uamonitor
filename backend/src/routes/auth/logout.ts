import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.post('/logout', { onRequest: server.auth() }, async (_req, reply) =>
    reply.clearTokens().send()
  );
