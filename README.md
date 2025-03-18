# Welcome to Todays News!

A modern, latest breaking news, analysis, and opinion on global events, politics, business, culture, and more.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (Version 20+ recommended)
- npm or yarn (Based on project configuration)
- Docker (For running in a container)

## Getting Started (Local Development)

### Installation

Install the dependencies:

```bash
yarn install
```

### Env
Create a env.local and add this keys

```env
VITE_NEWS_API_KEY=038e35511d5747878a2c0137fddcae6b
VITE_GUARDIAN_API_KEY=e8e0a62b-31c1-4d40-958a-9cc4f3b5b742
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
yarn build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `yarn build`

```
├── package.json
├── yarn.lock
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Technologies Used

- React (With React Router 7)
- Vite (For fast development builds)
- Tailwind CSS (For styling)
- React Query (For data fetching and caching)
- TypeScript (For type safety)

---

Built with ❤️ using React Router.
