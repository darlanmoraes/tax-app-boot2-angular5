## Tools
First of all, you will need to install theses tools:
```
docker-ce
docker-compose
maven
java 8
```


## Starting

To install this example application, run the following commands:

```bash
git clone git@github.com:darlanmoraes/tax-app-boot2-angular5.git
cd tax-app-boot2-angular5
```

This will get a copy of the project installed locally.

I've used mysql as the application database. If you don't want to install anything, follow the instruction below to start the database that i've already configured. To run the mysql, cd into the `server` folder and run:

```
docker-compose up --build
```

To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `server` folder and run:
 
```bash
./mvnw spring-boot:run
```

To run the client, cd into the `client` folder and run:
 
```bash
npm install && npm start
```