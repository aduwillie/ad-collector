#!/bin/bash
#----------------------------------------------------------------
echo "Setting up Traefik with HTTPS"
docker network create --driver=overlay traefik-public
export EMAIL=admin@example.com
export DOMAIN=sys.example.com
export USERNAME=admin
export PASSWORD=changethis
export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)
echo $HASHED_PASSWORD
export CONSUL_REPLICAS=3
export TRAEFIK_REPLICAS=3
# export TRAEFIK_REPLICAS=$(docker node ls -q | wc -l)
curl -L dockerswarm.rocks/traefik.yml -o traefik.yml
docker stack deploy -c traefik.yml traefik-consul
docker stack ps traefik-consul
docker service logs traefik-consul_traefik

# optional getting the client IP
curl -L dockerswarm.rocks/traefik-host.yml -o traefik-host.yml
docker stack deploy -c traefik-host.yml traefik-consul

#----------------------------------------------------------------
echo "Setting up portainer"
export DOMAIN=portainer.sys.example.com
export NODE_ID=$(docker info -f '{{.Swarm.NodeID}}')
docker node update --label-add portainer.portainer-data=true $NODE_ID
curl -L dockerswarm.rocks/portainer.yml -o portainer.yml
docker stack deploy -c portainer.yml portainer
docker stack ps portainer
docker service logs portainer_portainer
