#!/bin/bash
cd build
git init
git checkout -b gh-pages
git add .
git commit -am "New build by ${USER}"
git push "git@github.com:msanatan/square-invaders.git" gh-pages:gh-pages --force
rm -Rf .git
