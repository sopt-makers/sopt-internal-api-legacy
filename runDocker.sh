docker build . -t sopt-core-api-server

docker run -d -p 4000:4000 --name sopt-core-api-server sopt-core-api-server