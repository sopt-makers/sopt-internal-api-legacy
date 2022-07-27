
FROM node:16-alpine as base

# Add package file
COPY package.json ./
COPY yarn.lock ./
COPY prisma/ ./prisma/

# Install deps
RUN yarn install --frozen-lockfile

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN yarn generate
RUN yarn build

# Start production image build
FROM node:16-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules/ ./node_modules/
COPY --from=base ./package.json ./
COPY --from=base ./yarn.lock ./
COPY --from=base ./dist/ ./dist/
COPY ./.env ./

# Copy static files
# COPY src/public dist/src/public

ENV NODE_ENV=production
EXPOSE 4000
CMD ["yarn", "start:migrate"]