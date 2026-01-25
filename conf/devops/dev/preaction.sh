echo "> Create cache directory"
[ ! -d ${CLI_REPO_DIR}/cache/develop/dist ] && mkdir -p ${CLI_REPO_DIR}/cache/develop/dist
[ ! -d ${CLI_REPO_DIR}/cache/develop/node_modules ] && mkdir -p ${CLI_REPO_DIR}/cache/develop/node_modules

echo "> Build image"
docker build --rm \
    -t ts.sdk:${CLI_REPO_NAME} \
    ${CLI_REPO_DIR}/conf/docker/ts

echo "> Build virtual network"
if [ $(docker network ls --filter "name=${INFRA_DOCKER_NETWORK}" --format "{{.ID}}" | wc -l) -eq 0 ];
then
    docker network create ${INFRA_DOCKER_NETWORK}
fi
