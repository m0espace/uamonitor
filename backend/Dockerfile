FROM node:18.12.1-alpine3.16

# RUN apk add --update libc6-compat openssl openssl-dev

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY ./.env ./

COPY ./prisma ./

RUN npm run generate

COPY . .

RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "./entrypoint.sh" ]
