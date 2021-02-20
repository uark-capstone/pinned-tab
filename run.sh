#!/bin/sh
git reset --hard HEAD
git pull

npm install
npm run live