import { FastifyInstance, FastifyReply } from 'fastify';
import { CookieSerializeOptions } from '@fastify/cookie';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const cookieSettings: CookieSerializeOptions = {
  httpOnly: true,
  path: '/api/auth/refresh_token',
  sameSite: 'strict',
  maxAge: 2629800, //1 month
  secure: process.env.NODE_ENV === 'production'
};

declare module 'fastify' {
  interface FastifyReply {
    sendTokens: (user: User) => FastifyReply;
    clearTokens: () => FastifyReply;
  }
}

export default async (server: FastifyInstance) =>
  server
    .decorateReply('sendTokens', function (this: FastifyReply, { id, tokenVersion }: User) {
      const refresh_token = jwt.sign({ tokenVersion, id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d'
      });
      return this.setCookie('uwu', refresh_token, cookieSettings).send({
        user: {
          id
        },
        access_token: jwt.sign(
          {
            id
          },
          process.env.JWT_ACCESS_SECRET,
          {
            expiresIn: '15m'
          }
        ),
        refresh_token
      });
    })
    .decorateReply('clearTokens', function (this: FastifyReply) {
      return this.clearCookie('uwu', cookieSettings);
    });
