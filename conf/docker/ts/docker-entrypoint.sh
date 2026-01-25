#!/bin/sh
# vim:sw=4:ts=4:et
set -e

if [ -z ${1} ]; then
    tail -f /dev/null
elif [ "${1}" = "dev" ]; then
    sleep infinity
elif [ "${1}" = "build" ]; then
    npm install
    npm run build
else
    exec "$@"
fi
