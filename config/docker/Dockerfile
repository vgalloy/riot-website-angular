FROM node:7.8

USER root

WORKDIR /usr/src/app
RUN npm install -g angular-cli

ADD . /usr/src/app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]