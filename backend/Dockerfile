FROM node:16-bullseye

WORKDIR /app

COPY ./dist .

RUN npm i

EXPOSE 8080

CMD ["node", "."]