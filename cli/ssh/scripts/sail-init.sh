#!/bin/sh

#Set up sail's directory structure

set -e

sail_init(){

    echo "==============================="
    echo "Bootstraping Sail into machine"
    echo "==============================="

    echo "[1/3] Creating Sail's directory..."
    #Sail's root directory
    mkdir -p $HOME/sail

    echo "[2/3] Creating daemon space..."
    #Daemon's data
    mkdir -p $HOME/sail/daemon

    echo "[3/3] Creating user space..."
    #User's data
    mkdir -p $HOME/sail/user

    echo "Sail bootstrap script completed succesfully"
}

# wrapped up in a function so that we have some protection against an incomplete proccess
sail_init