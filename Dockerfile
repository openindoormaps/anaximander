# Use an official Node.js runtime as a parent image
FROM node:22.13.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose a port
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD [ "node", "dist/index.js" ]