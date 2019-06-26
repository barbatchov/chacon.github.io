#!/bin/bash

srcLocation=$(dirname $0);
deployLocation=$1;

ng build --prod --output-hashing none --build-optimizer false
mv -r dist/* $deployLocation
if [[ $(git status 2>/dev/null) != '' ]]; then
    cd $deployLocation
    git add --all
    git commit -m 'New Package deployed'
    git push -f origin master
    cd $srcLocation
fi

echo 'Deploy done'