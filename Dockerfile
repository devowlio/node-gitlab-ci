FROM node:lts-alpine

# This is the easist way currently, just install from registry
RUN npm install -g node-gitlab-ci@0.3.0

# Make node-gitlab-ci module available globally
ENV NODE_PATH=/usr/local/lib/node_modules