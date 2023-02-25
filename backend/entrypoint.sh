#!/bin/sh

npm run migrate

node ./dist | npx pino-pretty