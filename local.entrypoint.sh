#!/bin/bash

# Load .env file into shell
if [[ -f .env ]]; then
  export $(cat .env | grep -v ^# | xargs)
  echo "Environment variables from .env file loaded into shell."
else
  echo ".env file not found."
fi

# Go to the directory containing fetchAndStoreData.js
cd ./scripts

# Install dependencies if needed
# npm install axios idb

# Run the Node.js script
