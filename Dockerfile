FROM node:lts-alpine

# Install dependencies
RUN apk add --no-cache git

# This is the easist way currently, just install from registry
RUN npm install -g node-gitlab-ci@0.4.3

# Make node-gitlab-ci module available globally
ENV NODE_PATH=/usr/local/lib/node_modules