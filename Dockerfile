# Use the official Node.js image as the base image
FROM node:14

# Set working directory
WORKDIR /var/www/html/client

# Copy application files
COPY . /var/www/html/client/

# Expose port 80
EXPOSE 80
