# Check that kubectl is installed.
which kubectl > /dev/null || { echo 'ERROR: kubectl is not installed' ; exit 1; }

kubectl apply -f kube