# Use the official Node.js 18 Alpine image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]