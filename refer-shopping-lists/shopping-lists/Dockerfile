# Use the official Deno image
FROM denoland/deno:alpine-1.22.0

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port your app runs on
EXPOSE 7777

RUN deno cache app.js

# Run the application
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "app.js"]