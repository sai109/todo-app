FROM node:10.16.3-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY  . .
CMD yarn build

FROM node:10.16.3-alpine
ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY --from=build /app/dist .
RUN yarn start