#!/bin/bash

echo "stopping marsy-weather service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-marsy-webcaster.yml down
