FROM node:18

# Update node.js
RUN npm update -g

# Setting Container
WORKDIR /repo

# COMMAND
ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh
