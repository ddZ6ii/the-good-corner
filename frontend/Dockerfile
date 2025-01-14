# Specify the base image to extend from.
FROM node:20-alpine3.21

# Specify the working in the container where the application code will be copied and commands will be executed.
WORKDIR /app

# Environment variables defined using ARG are only available during the image build, not within the container's environment! They can be passed in either from Docker CLI using the `--build-arg` option, or either from the docker-compose `args` attribute.

# Environment variables defined using ENV are available both during image build and within the container environment. They ccan be passed in either from Docker CLI using the `--build-arg` option, or either from the docker-compose `env_file` or `environement` attributes.

# Copy and install the application's dependencies.
COPY package*.json yarn.lock ./
RUN yarn install

# Copy the application source code (excluding the files in .dockerignore).
COPY vite.config.ts .
COPY tsconfig*.json .
COPY codegen.ts .
COPY index.html .
COPY public public
COPY src src

# Indicate the port on which the application will listen for requests (documentation purposes only).
EXPOSE 5173

# Define the command to start the application (run at container's startup).
CMD ["yarn", "run", "dev:codegen:watch"]