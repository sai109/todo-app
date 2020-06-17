FROM node:10.16.3-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
# Our Second stage, that creates an image for production
FROM node:10.16.3-alpine
WORKDIR /app
COPY --from=builder ./app/dist/src ./
COPY package.json yarn.lock ./
RUN yarn install --production
CMD yarn start