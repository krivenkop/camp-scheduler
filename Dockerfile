# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=base /app/build ./build
COPY --from=base /app/package.json ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "build"] 