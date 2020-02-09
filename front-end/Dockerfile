# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install -qy
RUN npm install react-scripts -g
RUN npm install serve -g

COPY . .

RUN rm -rf /usr/build
RUN npm run build

COPY . .

EXPOSE 5000

RUN cp -R ./build /usr/build
CMD ["serve", "/usr/build", "-s"]
