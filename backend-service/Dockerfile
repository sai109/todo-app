FROM node:10.16.3-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY  . .
EXPOSE 3000
CMD ["yarn", "start"]