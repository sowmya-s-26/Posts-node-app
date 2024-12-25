# to setup mongo db using docker

mongo -> database - collections - fields

# to pull mongo container image from docker hub via terminal

docker run --name mongodb-container -d 27017:27017 mongo

# to check if its running

docker ps

# to execute the mongo instance

docker exec -it mongodb-container mongosh

#  to stop 

docker stop mongodb-container

docker rm mongodb-container


# WORKING COMMAND 

docker run -it --rm --network some-network mongo \
  mongosh --host some-mongo \
  -u admin \
  -p admin123 \
  --authenticationDatabase admin \
  some-db


docker logs <id>