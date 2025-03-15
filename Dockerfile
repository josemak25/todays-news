# -----------------------------------
# Base Image: Node.js with Corepack Enabled
# -----------------------------------
 FROM node:20 AS base

 # Enable Corepack for Yarn 4+
 RUN corepack enable && corepack prepare yarn@stable --activate
 
 WORKDIR /app
 
 # Copy package.json and yarn.lock first to create a project folder
 COPY package.json yarn.lock ./
 
 # Now set Yarn to use `node_modules` instead of Plug'n'Play
 RUN yarn config set nodeLinker node-modules
 
 # -----------------------------------
 # Stage 1: Install Development Dependencies
 # -----------------------------------
 FROM base AS development-dependencies-env
 COPY . /app
 RUN yarn install
 
 # -----------------------------------
 # Stage 2: Install Production Dependencies
 # -----------------------------------
 FROM base AS production-dependencies-env
 COPY . /app/
 RUN yarn install --mode=skip-build  # ✅ Fix: Avoids using PnP
 
 # -----------------------------------
 # Stage 3: Build the Application
 # -----------------------------------
 FROM base AS build-env
 COPY . /app/
 COPY --from=development-dependencies-env /app/node_modules /app/node_modules
 RUN yarn build
 
 # -----------------------------------
 # Stage 4: Create the Final Production Image
 # -----------------------------------
 FROM base
 COPY . /app/
 COPY --from=production-dependencies-env /app/node_modules /app/node_modules
 COPY --from=build-env /app/build /app/build
 
 CMD ["yarn", "start"]