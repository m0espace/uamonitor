import { CronJob } from 'cron';
import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { status } from 'minecraft-server-util';

export default async (server: FastifyInstance) =>
  new CronJob(
    '*/10 * * * *',
    async () => {
      const serversDB = await server.db.server.findMany({
        select: {
          id: true,
          ip: true,
          port: true,
          icon: true,
          changeIcon: true
        }
      });
      const servers = await Promise.all(
        serversDB.map(async serverDB => {
          return status(serverDB.ip, parseInt(serverDB.port), {
            timeout: 5000,
            enableSRV: true
          })
            .then(async res => {
              console.log(`${serverDB.id} is online (${res.players.online}/${res.players.max})`);
              const statusDB = await server.db.status.create({
                data: {
                  server: {
                    connect: {
                      id: serverDB.id
                    }
                  },
                  isOnline: true,
                  onlineCount: res.players.online,
                  maxOnline: res.players.max,
                  version: res.version.name
                },
                select: {
                  isOnline: true,
                  onlineCount: true,
                  date: true
                }
              });
              if (serverDB.icon !== res.favicon && serverDB.changeIcon)
                await server.db.server.update({
                  where: {
                    id: serverDB.id
                  },
                  data: {
                    icon: res.favicon
                  }
                });
              return {
                id: serverDB.id,
                data: statusDB
              };
            })
            .catch(async res => {
              console.log(`${serverDB.id} is offline`);
              await server.db.status.create({
                data: {
                  server: {
                    connect: {
                      id: serverDB.id
                    }
                  },
                  isOnline: false
                }
              });
            });
        })
      );
      console.log('pinged servers');
      server.websocketServer.clients.forEach(client => client.send(servers));
    },
    null,
    true,
    process.env.TZ,
    null,
    false
  );
