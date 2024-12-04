# mysql script
docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=3353 -e MYSQL_DATABASE=flagfolio_data -p 3306:3306 -v mysql-data:/var/lib/mysql -d mysql:5.7

#backend script
docker pull braddev2/flagfolio_backend:latest
docker run --name flagfolio_backend --link my-mysql:mysql -p 5000:5000 -d braddev2/flagfolio_backend:latest
