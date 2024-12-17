# Use the version of source image
FROM node:20-alpine3.21

# Use built-times variables to set the build context
ARG BUILD_CONTEXT

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock files
COPY package.json .
COPY yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./${BUILD_CONTEXT}/package.json ./${BUILD_CONTEXT}/package.json

# Copy common files
COPY ./common/ ./common/

# Install dependencies
RUN yarn install

# Copy the application code files (excluding the ones in .dockerignore)
COPY tsconfig*.json .
COPY ./${BUILD_CONTEXT} ./${BUILD_CONTEXT}

# Define the command to run the application
CMD ["yarn", "dev"]