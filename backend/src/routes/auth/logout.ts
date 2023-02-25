import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.post('/logout', async (_req, reply) => reply.clearTokens().send());
