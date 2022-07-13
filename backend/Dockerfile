FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./

RUN pnpm install

COPY ./prisma/schema.prisma ./

RUN npm run migrate

RUN npm run generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist"]
