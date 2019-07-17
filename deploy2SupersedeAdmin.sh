#!/usr/bin/env bash

npm run dev
rm -rf ../../gitlab/supersede-admin/src/main/webapp/src/assets/supersede/
cp -r ./dist/supersede ../../gitlab/supersede-admin/src/main/webapp/src/assets/
