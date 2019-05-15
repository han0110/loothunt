# Builder dependencies stage
FROM node:10 AS builder-deps

WORKDIR /frontend

COPY ./package.json /frontend/package.json
COPY ./package-lock.json /frontend/package-lock.json

RUN npm i

# Build stage
FROM node:10 AS builder

WORKDIR /frontend

COPY --from=builder-deps  /frontend/node_modules /frontend/node_modules
COPY . /frontend

RUN npm run build

# Dependencies stage
FROM node:10 AS deps

WORKDIR /frontend

COPY ./package.json /frontend/package.json
COPY ./package-lock.json /frontend/package-lock.json

RUN npm i --production

# Final stage
FROM node:10-alpine

WORKDIR /frontend

COPY --from=builder /frontend/build /frontend/build
COPY --from=deps /frontend/node_modules /frontend/node_modules
COPY . /frontend

EXPOSE 3000

CMD ["npm", "run", "start"]
