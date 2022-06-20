
FROM node:16-alpine as base

# Create app directory
WORKDIR /app

# Add package file
COPY package.json ./
COPY prisma/ ./
COPY yarn.lock ./

# Install deps
RUN yarn install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN yarn build

# Start production image build
FROM node:16-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /dist /dist

# Copy static files
# COPY src/public dist/src/public

# Expose port 3000
EXPOSE 3000
CMD ["yarn", "start"]