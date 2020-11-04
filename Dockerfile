FROM node:12.13.0
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm config set prefix /usr/local

RUN npm i -g serverless

RUN apt-get update

RUN apt-get -y upgrade

RUN serverless dynamodb install

RUN apt-get -y install default-jdk
