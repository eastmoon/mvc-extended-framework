echo "> Start container with docker-compose"

# Analysis compose command, default is v1.
DC_COMMAND="docker-compose"
## Detect v1
[ $(command -v docker-compose | wc -l) -gt 0 ] && DC_COMMAND="docker-compose"
## Detect v2
[ $(docker --help | grep compose | wc -l) -gt 0 ] && DC_COMMAND="docker compose"

# Declare variable
DOCKER_CONTAINER_NAME=${CLI_REPO_NAME}-${TARGET_PROJECT_DEV_SERVER_HOSTNAME}
DC_ENV=${CLI_REPO_DIR}/cache/docker-compose-dev.env
DC_CONF=${CLI_REPO_DIR}/conf/docker/docker-compose-dev.yml

# Execute container
if [ -e ${DC_CONF} ];
then
    # create docker-compose env file
    [ -e ${DC_ENV} ] && rm ${DC_ENV}
    echo PROJECT_NAME=${CLI_REPO_NAME} > ${DC_ENV}
    echo PROJECT_DIR=${CLI_REPO_MAPPING_DIR} >> ${DC_ENV}
    echo SRV_HOSTNAME=${TARGET_PROJECT_DEV_SERVER_HOSTNAME} >> ${DC_ENV}
    echo SRV_IMAGE_NAME=ts.sdk:${CLI_REPO_NAME} >> ${DC_ENV}
    echo SRV_CONTAINER_NAME=${DOCKER_CONTAINER_NAME} >> ${DC_ENV}
    echo SRV_PORT=${TARGET_PROJECT_DEV_SERVER_PORT} >> ${DC_ENV}
    echo SRV_COMMAND=${TARGET_PROJECT_COMMAND} >> ${DC_ENV}
    echo INFRA_DOCKER_NETWORK=${INFRA_DOCKER_NETWORK} >> ${DC_ENV}

    # startup with docker-compose
    ${DC_COMMAND} --file ${DC_CONF} --env-file ${DC_ENV} up -d

    # do action with container
    docker exec -ti ${DOCKER_CONTAINER_NAME} bash
else
    echo "> ${DC_CONF} can not find."
fi
