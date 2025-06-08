# Use the official Node.js 18 image as the base image
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js image for the final production image
FROM node:lts-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set the command to run the application
CMD ["node", "dist/main"]

# Expose port 3000
EXPOSE 3000