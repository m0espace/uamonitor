import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get('/ws', { websocket: true }, async (connection, req) => {
    connection.on('connection', stream => {
      
    });
  });
