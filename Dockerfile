FROM node:12-alpine

ARG PORT=80

WORKDIR /server

COPY ./src src
COPY ./jest.config.js jest.config.js
COPY ./.eslintrc.js .eslintrc.js
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm ci
RUN npm test
ENV NODE_ENV=production
RUN npm prune

ENV PORT=$PORT
EXPOSE $PORT

CMD [ "npm", "start" ]
