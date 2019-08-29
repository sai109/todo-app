FROM node:10.16.3-alpine as build-stage
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
