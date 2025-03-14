FROM node:20 AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN yarn install

FROM node:20 AS production-dependencies-env
COPY ./package.json yarn.lock /app/
WORKDIR /app
RUN yarn install --production

FROM node:20 AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn build

FROM node:20
COPY ./package.json yarn.lock /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["yarn", "start"]