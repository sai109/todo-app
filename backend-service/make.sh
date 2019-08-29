USER="luke"
HOMEDIR="/home/$USER"
EXECUTE_AS="sudo -u luke HOME=$HOME_DIR"

test() {
    docker-compose up --build --exit-code-from backend
}