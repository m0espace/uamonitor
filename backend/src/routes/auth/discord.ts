import { FromSchema } from 'json-schema-to-ts';
import { FastifyInstance } from 'fastify';
import axios from 'axios';

const schema = {
  body: {
    type: 'object',
    required: ['code'],
    properties: {
      code: { type: 'string' }
    }
  }
} as const;

// https://discord.com/api/oauth2/authorize?client_id=1078782002704175156&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F&response_type=code&scope=identify

export default async (server: FastifyInstance) =>
  server.post<{ Body: FromSchema<typeof schema.body> }>(
    '/discord',
    { schema },
    async (req, reply) => {
      const { data } = await axios
        .post(
          'https://discord.com/api/oauth2/token',
          new URLSearchParams({
            /* eslint-disable camelcase */
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri:
              process.env.NODE_ENV === 'production'
                ? 'https://stats.m0e.space/'
                : 'http://127.0.0.1:3000/',
            code: req.body.code
            /* eslint-enable */
          }).toString(),
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`,
                'utf-8'
              ).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(() => reply.code(400).send(new Error('Invalid code')));
      if (!data) return reply.send(new Error());
      // eslint-disable-next-line one-var
      const {
        data: { id, username }
      } = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `${data.token_type} ${data.access_token}` }
      });
      if (!id) return reply.send(new Error());
      const user =
        (await server.db.user.findFirst({
          where: {
            id
          }
        })) ||
        (await server.db.user.create({
          data: {
            id,
            discordName: username
          }
        }));
      if (!user) return reply.send(new Error());
      reply.sendTokens(user);
    }
  );
