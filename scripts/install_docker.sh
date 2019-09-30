#!/bin/bash

sudo apt-get update
# install general requirements
sudo apt-get install -y \
    && ca-certificates \
    && curl \
    && software-properties-common \
    && apt-transport-https

# install docker
sudo apt-get install -y \
    && docker \
    && docker.io

# confirm docker installation
docker info

# install docker compose
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# add command completion
curl -L https://raw.githubusercontent.com/docker/compose/1.24.1/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose
docker-compose --version
