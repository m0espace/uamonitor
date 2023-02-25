import fastify, { FastifyInstance, FastifyRequest, onRequestHookHandler } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { PrismaClient } from '@prisma/client';
import fastifySchedule from '@fastify/schedule';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import TelegramBot from 'node-telegram-bot-api';

import path = require('path');
import { verify } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient;
    auth: () => onRequestHookHandler;
  }
  interface FastifyRequest {
    user: {
      id: string;
    };
  }
  interface FastifyReply {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendError: (error: any, code?: number, explanation?: string) => void;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      TELEGRAM_BOT_TOKEN: string;
      TELEGRAM_BOT_SECRET: string;
    }
  }
}

const server = fastify({
  logger: true,
  ajv: { customOptions: { allErrors: true } }
})
  .decorate('db', new PrismaClient())
  .register(fastifyCookie)
  .addHook('onRoute', route => console.log(route.url))
  .register(fastifySchedule)
  .register(fastifyCors, {
    origin: ['http://127.0.0.1:5173'],
    credentials: true
  })
  .decorate('user', null)
  .decorate<() => onRequestHookHandler>('auth', () => async (req, reply) => {
    if (!req.headers.authorization) return reply.code(403).send(new Error('Forbidden'));
    try {
      req.user = verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_ACCESS_SECRET
      ) as FastifyRequest['user'];
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') reply.code(403).send(new Error('Expired Access Token'));
      else reply.sendError('Auth error occured');
    }
  })
  .register(fastifyAutoload, {
    dir: path.join(__dirname, 'jobs')
  })
  .decorateReply(
    'sendError',
    function (error: any, code = 500, explanation = 'Unexpected error occured.') {
      this.log.error(error);
      this.code(code).send(new Error(explanation));
    }
  )
  .register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true,
    autoHooks: true,
    options: { prefix: '/api' }
  });

const telegram = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

telegram.onText(/\/start (.+)/, async (msg, match) => {
  if (!match || !match[1])
    return telegram.sendMessage(
      msg.chat.id,
      'Вітаємо! Щоб користуватися ботом, вам необхідно верифікуватися на сайті в Профілі.'
    );
  try {
    const userDB = await server.db.user.update({
      where: {
        telegramCode: match[1]
      },
      data: {
        chatId: msg.chat.id
      }
    });
    telegram.sendMessage(msg.chat.id, `Вітаємо! Профіль ${userDB.name} приєднано!`);
  } catch (e) {
    telegram.sendMessage(
      msg.chat.id,
      'Сталася помилка розпізнавання, можливо ви ввели застарілий код. Спробуйте перезагрузити сторінку Профілю та спробувати верифікуватися ще раз.'
    );
  }
});

server
  .listen(process.env.PORT || 8080, '0.0.0.0')
  // eslint-disable-next-line no-console
  .then(() => console.log('Server Started'))
  // eslint-disable-next-line no-console
  .catch(console.error);
