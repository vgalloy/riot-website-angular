FROM node:6.9.1-slim

USER root

WORKDIR /usr/src/app
RUN npm install -g angular-cli

ADD . /usr/src/app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]