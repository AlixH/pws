# Prog Web - Client & Server side : Development of a collaborative platform for exchanging audio plugins  

In this document, you will find:  
- Student names 
- Features of our project
- How to run the projet 




## Students  
- Aourinmouche Chihabeddine                                    
- Aourinmouche Soufiane
- Humbert Alix
- Larabi Walid

## Features  



## Run the project

##### Pre-Requisite
- Install Docker with docker-compose version >= 3.2 (Recommended version 3.2)
     - [Install Docker](https://www.docker.com/)
     - [Install Docker Compose](https://docs.docker.com/compose/install/)
- Install Node version >= 8
     - [Install Nodejs](https://nodejs.org/en/)
- Install Mongodb version >= 3.4
     - [Install Mongodb for Ubuntu](https://docs.mongodb.com/tutorials/install-mongodb-on-ubuntu/)
     -  [Install Mongodb for OSX](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
     -  [Install Mongodb for Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

##### Steps
In the root directory of this code, use the following commands:
`docker-compose build` - _to build the project_
`docker-compose up` - _to run the project_
_**Note:** You may need to run with the root permission if Docker is installed via root user. like: `sudo docker-compose up`_

These command runs the following services using docker-compose.yml

###### back:
back service will run and create container called `demo-back-end`.
back service is our service layer running on top of `mongodb`. The default port at which this service is running is 5000 which can be changed by setting the environment variable

_***Note:*** You need to open port 4000 from the server configurations to make it avaiable for `demo server`. If you want to change/customize the port you can change the outisde port from the back service of docker-compose.yml file. Like if you want to configure port 4001 then you need to replace the following lines:_

ports:

    - '4000:4000'
with the following lines:

ports:

    - '4001:4000'

##### front:
front service will run and create container called `demo-front-end`. It needs `back` services to intract with the database that is why it will run after `back` service image.

