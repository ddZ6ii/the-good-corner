# Specify the base image to extend from.
FROM node:20-alpine3.21

# Specify the working in the container where the application code will be copied and commands will be executed.
WORKDIR /app

# Environment variables defined using ARG are only available during the image build, not within the container's environment! They can be passed in either from Docker CLI using the `--build-arg` option, or either from the docker-compose `args` attribute.

# Environment variables defined using ENV are available both during image build and within the container environment. They ccan be passed in either from Docker CLI using the `--build-arg` option, or either from the docker-compose `env_file` or `environement` attributes.

# Copy and install the application's dependencies.
COPY package*.json yarn.lock ./
COPY common/package*.json common/
COPY frontend/package*.json frontend/
RUN yarn install

# Copy the application source code (excluding the files in .dockerignore).
COPY tsconfig.json .
COPY common/tsconfig.json common/
COPY common/dist common/dist
COPY common/src common/src
COPY frontend/vite.config.ts frontend/
COPY frontend/tsconfig*.json frontend/
COPY frontend/index.html frontend/
COPY frontend/public frontend/public
COPY frontend/src frontend/src

# Indicate the port on which the application will listen for requests (documentation purposes only).
EXPOSE 5173

# Define the command to start the application (run at container's startup).
CMD ["yarn", "dev:front"]