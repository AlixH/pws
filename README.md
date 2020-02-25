# Prog Web - Client & Server side : Development of a collaborative platform for exchanging audio plugins  

In this document, you will find:  
- Student names 
- Features of our project
- How to run the projet 




## Students  
- Aourinmouche Chihabeddine :innocent:                                
- Aourinmouche Soufiane  :smiling_imp:
- Humbert Alix :satisfied:
- Larabi Walid :sunglasses:

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

The app is made out of 2 different modules : Back-end and Front-end. They are both containerized, with required dependencies, in Docker container that allows to execute all the environment with one command. The goal for using Docker is to make the app independent from the environment and the machine where it runs. The provided Dockerfile does install required dependencies, copies the /build folder in the virtual environment, exposes the right ports and serves /build.
The two modules can be runned separately without using Docker. 


## Run without Docker
If you don’t have Docker installed, please do the following commands in the root : 

To run the backend :

```cd back-end ```

``` npm install ```

``` npm start ```  

it will run on : localhost:4000

To run the front, in a new terminal window :

``` cd front-end ```

``` npm install ```

``` npm start ```  

it will run on : localhost:3000


## Run with Docker :whale:

If you have Docker installed, please do the following steps :

##### Steps
In the root directory of this code, use the following commands:
`docker-compose build`  - _to build the project_
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

## Galerie 
When running the app, the home page is opened. It lists all plugins that have been published and stored in our MongoDB database. Information about each plugin is represented in a card. We can find information below : 

![xxxxx](https://user-images.githubusercontent.com/19587815/75289890-8f527e00-581f-11ea-9ada-2db1388707b6.png)


In order to display a plugin details, you need to click in its name. A window is opened displaying the same component we can see in the picture above, with its description. To close the window, click on "Escape" button or on the plugin name, or even outside the window.


## Login, plugin upload, rates and comments
It is possible to login the app. To do so, click on "CONNEXION" button in top right of the navigation bar. Write you logins : email= soufiane@aouri.com and password= 000000 then click on "CONNEXION" button. Otherwise, you can also use the app without login. To do so, click on "Continuer en tant que visiteur". This will reduce features you can use in the app !
Once you're logged in, you have access to more features. When you come back to the home page, you can add a comment or rate a plugin by going on its details panel like described above.  

In order to upload a new plugin, there is a dedicated button "Publier un plugin" in the navigation bar. You have access to it only if you're logged in ! Clicking on it will redirect you to Upload page. The upload can be made in 2 or 3 steps :
--> First step : Fill the form with name, version, URL video, URL image ... All fields are required except Tags. 
You can add up to 5 tag at maximum. To add a tag, type it "tag1 bla bla.." then press OK, this will add "tag1 bla bla.." in the list, then you can do the same to add a second one ... The submit button is disabled till the required fields are filled. Required fields are marked with (*).  
When you toggle on "open source" button, the second step "Upload zip" is enabled and a button "submit" become "next". Click on "Charger l'archive du plugin" and choose plugin zip then click "submit". A confirmation message appears. Returning to the home page, you can see you're new uploaded plugin in the top of the list as they are sorted by upload date (this choice has been taked for demonstration purpose, thus we can see easily the uploaded plugin without looking for it ampng the list items) ! Congrats. :clap:


