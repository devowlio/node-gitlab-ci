FROM node:13-stretch

# This is the easist way currently, just install from registry
RUN npm install -g node-gitlab-ci@0.1.10

# Make node-gitlab-ci module available globally
ENV NODE_PATH=/usr/local/lib/node_modules