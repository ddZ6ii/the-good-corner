# Use the version of source image
FROM node:20-alpine3.21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock files
COPY package.json .
COPY yarn.lock .
COPY common/package.json common/
COPY frontend/package.json frontend/

# Install dependencies
RUN yarn install

# COPY shared config file
COPY tsconfig.json .

# Copy common files
COPY common/dist common/dist
COPY common/src common/src
COPY common/tsconfig.json common/

# Copy service code files (excluding the ones in .dockerignore)
COPY frontend/public frontend/public
COPY frontend/src frontend/src
COPY frontend/index.html frontend/
COPY frontend/tsconfig*.json frontend/
COPY frontend/vite.config.ts frontend/

# Define the command to run the application
CMD ["yarn", "dev:front"]