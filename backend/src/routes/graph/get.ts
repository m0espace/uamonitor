import { FastifyInstance } from 'fastify';

export default async (server: FastifyInstance) =>
  server.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const serverDB = await server.db.server.findFirst({
      where: {
        id: Number.parseInt(req.params.id)
      },
      select: {
        id: true
      }
    });

    const from = new Date();
    from.setHours(from.getHours() - 24);
    const statuses = (
      await server.db.status.findMany({
        where: {
          date: {
            gte: from,
            lte: new Date()
          }
        },
        select: {
          isOnline: true,
          onlineCount: true,
          date: true,
          serverId: true
        },
        orderBy: {
          date: 'desc'
        }
      })
    ).filter(stat => stat.date.getMinutes() % 10 === 0);
    // console.log(statuses);
    return {
      id: serverDB?.id,
      data: statuses
        .filter(status => status.serverId === serverDB?.id)
        .map(({ isOnline, onlineCount, date }) => ({
          isOnline,
          onlineCount: !onlineCount ? 0 : onlineCount,
          date
        }))
    };
    reply.send(statuses);
  });
