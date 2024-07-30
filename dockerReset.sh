docker-compose down &&
docker rmi -f $(docker images -a -q) &&
docker volume prune -f