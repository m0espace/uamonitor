import fastify, { FastifyInstance } from 'fastify';
// @ts-ignore
import ajvErrors from 'ajv-errors';
import fastifyAutoload from '@fastify/autoload';
import { PrismaClient } from '@prisma/client';
import fastifySchedule from '@fastify/schedule';
import fastifyCors from '@fastify/cors';
import fastifyWebSocket from '@fastify/websocket';

import path = require('path');
import { appendFile } from 'fs';

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient;
  }
}

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    TZ: string;
    PORT: number;
  }
}

fastify({
  logger: { prettyPrint: true },
  ajv: { plugins: [ajvErrors], customOptions: { allErrors: true } }
})
  .decorate('db', new PrismaClient())
  .addHook('onRoute', route => console.log(route.url))
  .register(fastifySchedule)
  .register(fastifyWebSocket)
  .register(fastifyCors, {
    origin: ['http://127.0.0.1:3000'],
    credentials: true
  })
  .register(fastifyAutoload, {
    dir: path.join(__dirname, 'jobs')
  })
  .register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true,
    autoHooks: true,
    options: { prefix: '/api' }
  })
  .listen(process.env.PORT || 8080, '0.0.0.0')
  // eslint-disable-next-line no-console
  .then(() => console.log('Server Started'))
  // eslint-disable-next-line no-console
  .catch(console.error);
