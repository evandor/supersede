#!/usr/bin/env bash

npm run builddev
rm -rf ../../gitlab/supersede-admin/src/main/webapp/src/assets/supersede/
cp -r ./dist/supersede ../../gitlab/supersede-admin/src/main/webapp/src/assets/
