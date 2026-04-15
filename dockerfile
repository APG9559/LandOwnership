FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only (no dev deps yet)
FROM base AS deps
COPY package*.json ./
RUN npm ci --ignore-scripts

# Build the app
FROM deps AS build
COPY . .
RUN npm run build

# Production image, copy only necessary files
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]