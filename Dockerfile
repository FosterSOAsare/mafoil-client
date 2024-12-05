# Use a smaller image for the runtime
# Run docker only after running npm run build
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Clear npm cache after installation (optional, helps reduce image size)
# RUN npm cache clean --force

# Install only production dependencies
RUN npm install --omit=dev 

# Copy only the built application files from the local dist folder to the container
COPY /.next /app/.next
COPY /next.config.js /app/.next
COPY /public /app/public
COPY /.env /app/.env

# Set environment variable for the Node.js application
ENV NODE_ENV=production

# Command to run the application
CMD  npm start

# Expose the port your application runs on
EXPOSE 3000