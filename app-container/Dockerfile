FROM node:18.17

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /usr/src/

RUN ["mkdir", "dependencies"]
COPY package*.json ./dependencies

WORKDIR /usr/src/dependencies
RUN npm install

ENV NODE_PATH=/usr/src/dependencies/node_modules

WORKDIR /usr/src/app

EXPOSE 3010