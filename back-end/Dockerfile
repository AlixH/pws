# base image
FROM node:9.6.1
WORKDIR /usr/app

COPY package*.json ./

RUN export NODE_ENV=development



RUN npm i npm@latest -g
RUN npm install -qy


COPY . .

EXPOSE 4000

CMD ["npm", "start"]

