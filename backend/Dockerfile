FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "dist"]