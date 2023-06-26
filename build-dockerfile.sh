# Fail fast.
set -e

# Define some useful variables
STABLE_TAG=$(git log -n 1 --pretty='format:%cd-%h' --date=format:'%Y%m%d%H%M')
REPORSITORY_URL_WITH_STABLE_TAG="rodrigojbcs/file-manager-server:${STABLE_TAG}"
BUILD_FOLDER=.

# Check that docker is installed and running.
which docker > /dev/null && docker ps > /dev/null || { echo 'ERROR: docker is not running' ; exit 1; }

echo "Building $REPORSITORY_URL_WITH_STABLE_TAG from $BUILD_FOLDER/Dockerfile"

# Build image.
docker build -t $REPORSITORY_URL_WITH_STABLE_TAG $BUILD_FOLDER

docker push $REPORSITORY_URL_WITH_STABLE_TAG