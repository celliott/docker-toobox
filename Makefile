# Makefile for docker-toobox

# env varibles
AUTH_USER ?= 'admin'
AUTH_PASS ?= 'password'
SONOS_API ?= '172.17.0.1:5005'
SONOS_DEVICE ?= 'Living Room'
WEMO_API ?= '172.17.0.1:5000'
WEMO_DEVICE ?= 'Heater'

# docker settings
PORTS = -p 80:80
CONTAINER = toobox
ENVS = -e AUTH_USER=$(AUTH_USER) -e AUTH_PASS=$(AUTH_PASS) -e SONOS_API=$(SONOS_API) -e SONOS_DEVICE=$(SONOS_DEVICE) -e WEMO_API=$(WEMO_API) -e WEMO_DEVICE=$(WEMO_DEVICE)

.PHONY: container run

container :
	docker build -t $(CONTAINER) .

run :
	docker run --restart=always  --name $(CONTAINER) -i -d $(PORTS) $(ENVS) $(VOLUMES) -t $(CONTAINER)

stop :
	docker stop $(CONTAINER)
	docker rm $(CONTAINER)

kill :
	docker kill $(CONTAINER)
	docker rm $(CONTAINER)

restart :
	docker kill $(CONTAINER)
	docker rm $(CONTAINER)
	docker run --name $(CONTAINER) -i -d $(PORTS) $(ENVS) $(VOLUMES) -t $(CONTAINER)

bash:
	docker exec -ti $(CONTAINER) /bin/bash

tail:
	docker logs -f $(CONTAINER)
