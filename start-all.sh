#!/bin/bash

source ./framework.sh

echo "starting all"
docker-compose --env-file ./.env.docker \
               --file marsy-launchpad/docker-compose-marsy-launchpad.yml \
               --file marsy-weather/docker-compose-marsy-weather.yml  \
               --file marsy-mission/docker-compose-marsy-mission.yml \
                --file marsy-telemetry/docker-compose-marsy-telemetry.yml \
                 --file marsy-mock/docker-compose-marsy-mock.yml \
               --file gateway/docker-compose-gateway.yml up -d         
wait_on_health http://localhost:9500 gateway
echo "all services started behind gateway"
docker-compose logs -f
