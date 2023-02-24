import { FastifyInstance } from 'fastify';
import { verify } from 'jsonwebtoken';
import { User } from '@prisma/client';

export default async (server: FastifyInstance) =>
  server.post('/refresh_token', async (req, reply) => {
    const refreshToken = req.cookies.uwu ?? null;
    if (!refreshToken) return reply.code(401).send({ error: 'Cookie or is missing' });
    try {
      const { id, tokenVersion } = verify(refreshToken, process.env.JWT_REFRESH_SECRET) as User,
        user = await server.db.user.findUnique({
          where: { id }
        });
      if (!user || tokenVersion !== user.tokenVersion)
        return reply.code(403).clearTokens().send(new Error('Please login again'));
      // server.redis.SREM(`refresh_token:${id}:${req.ip}`, refreshToken);
      return reply.sendTokens(user);
    } catch (e) {
      return reply.clearTokens().sendError(e, 401, 'Cannot validate your auth, please login again');
    }
  });
