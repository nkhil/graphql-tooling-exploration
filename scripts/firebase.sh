#!/usr/bin/env bash
set -o errexit errtrace nounset pipefail

if test -f .firestore-emulator; then
  port=$(cat .firestore-emulator)
  status=$(curl -s -o /dev/null -w "%{http_code}" localhost:${port} || true)
  if test ${status} = "200"; then
    echo "Emulator seems to be running at port ${port}. Good luck!"
    exit
  else
    echo "Emulator does not seem to be running. Remove .firestore-emulator and try again."
    exit
  fi
fi

cid=$(docker create --rm --publish 0.0.0.0::8080/tcp google/cloud-sdk:latest gcloud beta emulators firestore start --host-port=0.0.0.0:8080)

function finish {
  rm .firestore-emulator
  docker stop -t 0 "${cid}" 1>/dev/null
}
trap finish EXIT

docker start "${cid}" 1>/dev/null

port=$(docker inspect --format='{{(index (index .NetworkSettings.Ports "8080/tcp") 0).HostPort}}' "${cid}")
echo "${port}" > .firestore-emulator

echo "Emulator bound at port ${port}"
echo ""

docker logs -f "${cid}"
