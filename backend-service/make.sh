USER="luke"
HOMEDIR="/home/$USER"
EXECUTE_AS="sudo -u luke HOME=$HOME_DIR"

test() {
    docker-compose -f docker-compose.test.yml up --build --exit-code-from backend
}

dev() {
    docker-compose up --build -d
}