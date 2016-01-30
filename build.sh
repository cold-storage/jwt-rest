#!/usr/bin/env bash
set -e

# Does a full clean build of the project.
# This should be used as a basis for the Dockerfile.

rm -rf node_modules
npm install