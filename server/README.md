Marketplace para estudos de NodeJS, Express e MongoDB.


Build and init MongoDB
docker-compose up -d --build

MongoDB
User: market
Password: place

MongoDB Compass
mongodb://market:place@localhost:27017/marketplace

Container shell access and viewing MongoDB logs
docker exec -it mongo bash

Through Docker container logs
docker logs mongo

Admin Page Mongo Express
http://localhost:8081/
