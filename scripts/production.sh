#!/bin/bash

git pull origin main

# Remove old packages and build files
rm -rf node_modules/ ./.next/

# Install dependencies and build
npm ci
npm run build

# Start Server
PORT=80 npm start
