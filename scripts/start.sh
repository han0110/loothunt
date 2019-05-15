#!/bin/bash

APPS=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -o|--os)
    OS="$2"
    shift # past argument
    shift # past value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument
    ;;
    *)    # apps to start
    APPS+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${APPS[@]}" # restore apps parameters

# 1. Check if .env file exists
if [ "${DEFAULT}" = "YES" ]; then
    ENVPATH="./.env.default"
else
    ENVPATH="./.env"
fi

if [ -e "${ENVPATH}" ]; then
    source "${ENVPATH}"
else
    echo "Please set up your "${ENVPATH}" file before starting your environment."
    exit 1
fi

# 2. Setup different os requirement
if [ "$OS" = "GCP" ]; then
    source ./scripts/docker-compose-alias.sh
fi

# 3. Build local images
docker-compose build

# 4. Start services
docker-compose up -d "${APPS[@]}"

exit 0
