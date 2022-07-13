FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY ./.env ./

COPY ./prisma/schema.prisma ./

RUN npm run migrate

RUN npm run generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist"]
