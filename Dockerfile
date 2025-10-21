# -------------------------------------------------------------------------
# Stage 1: Build - Install all dependencies and compile the TypeScript code
# -------------------------------------------------------------------------
FROM node:20-slim AS builder

# Set the working directory for the application source and build process
WORKDIR /app

# Copy package.json and install all dependencies (including devDependencies like TypeScript)
COPY package.json ./

# The original Dockerfile for a working build used apt-get update before installing packages.
# We'll stick to running npm install for now, assuming the base image has curl/wget/etc. for npm to work.
RUN npm install

# Copy all source code
COPY . .

# Run the TypeScript build step
# This creates the compiled JavaScript files in the 'dist' directory.
RUN npm run build

# -------------------------------------------------------------------------
# Stage 2: Production - Create the final, smaller runtime image
# -------------------------------------------------------------------------
# Use a slim Node image for the final runtime
FROM node:20-slim AS production

# Set working directory
WORKDIR /app

# 1. Install system dependencies for Puppeteer (Chromium)
# This list is taken from your working example, ensuring all necessary libraries are present.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    # Clean up the apt cache to reduce image size
    && rm -rf /var/lib/apt/lists/*

# 2. Install only production dependencies
COPY package.json .
RUN npm install

# 3. Copy the compiled application from the 'builder' stage
COPY --from=builder /app/dist ./dist

# 4. Set Environment Variables (using correct format to avoid warnings)
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV PORT=3000

# 5. Expose the application port
EXPOSE 3000

# 6. Define the command to run the compiled app
# The 'start' script runs 'node dist/index.js'
CMD [ "npm", "start" ]