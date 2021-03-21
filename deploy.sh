#!/usr/bin/env sh
# abort on errors
set -e
rm -rf dist
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:pabratte/vue-timer.git master:gh-pages
cd -