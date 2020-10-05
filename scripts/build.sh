#!/bin/bash -ex

npm run typecheck
#npm lint
#npm test

rm -rf dist
tsc -p .
