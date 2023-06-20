docker build -t file-manager-server/alpine-ms .

docker container run -it --rm \
    --name file-manager-server \
    -p 8000:8000 \
    file-manager-server/alpine-ms:latest