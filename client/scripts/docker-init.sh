#!/bin/sh

#Handle the instillation/verification of docker on machine

set -e

#Online link where instillation script lives
DOCKER_SOURCE=get.docker.com

#Location of instillation
DOCKER_DEST="/tmp/docker-install.sh"



#Start docker 
#--no-stream is used since stats are not important
docker_launch() {

    echo "Checking if Docker is already running ..."
    #Check to see if docker is running
    if ! sudo docker stats --no-stream ; then
        
        #Launch docker
        echo "Launching Docker"
        sudo service docker start

        #Wait for docker to start
        echo "Waiting for Docker to launch ..."
        while ! sudo docker stats --no-stream ; do
            sleep 1
        done
    fi
}

#Download Docker instillation script
download_script(){
    if hash curl 2>/dev/null; then
        sudo curl -fsSL $DOCKER_SOURCE -o $DOCKER_DEST
    elif hash wget 2>/dev/null; then
        sudo wget -O $DOCKER_DEST $DOCKER_SOURCE
    else
        #Neither curl/wget are installed so install curl
        apt-get update && apt-get -y install curl
    fi;
}

#Install docker
docker_install(){
    echo "Installing Docker ..."
    download_script
    sh $DOCKER_DEST
    echo "Docker installed successfully"
}


#Wrapper for docker instillation/verification 
docker_init(){

    echo "================================"
    echo "Bootstraping Docker into machine"
    echo "================================"
    echo "Checking if Docker is already installed ..."

    #Check for docker , if installed start and return
    if hash docker 2>/dev/null; then
        echo "You seem to have Docker installed"
        docker_launch
        echo "Docker bootstrap script completed succesfully"
        exit 0
    fi;

    #Otherwise Install and launch
    echo "You don't seem to have Docker installed"
    docker_install
    docker_launch
    echo "Docker bootstrap script completed succesfully"
}

# wrapped up in a function so that we have some protection against an incomplete proccess
docker_init