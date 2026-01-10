# Vercel Build Configuration

## Environment Variables Required

To ensure the build completes successfully on Vercel, the following environment variables must be set:

### Required for API Client Generation (Orval)

- `BACKEND_API_URL` - The URL of your backend API server (e.g., `https://api.yourdomain.com` or `http://localhost:3000`)
  - Orval will automatically fetch the OpenAPI spec from `${BACKEND_API_URL}/docs/json`

### Required for Database (Prisma)

- `POSTGRES_URL` - Your PostgreSQL database connection string

### Required for Authentication (Auth0)

- `AUTH0_DOMAIN` - Your Auth0 domain
- `AUTH0_CLIENT_ID` - Your Auth0 client ID
- `AUTH0_CLIENT_SECRET` - Your Auth0 client secret
- `AUTH0_SECRET` - A random secret for Auth0 session encryption
- `APP_BASE_URL` - Your application base URL (e.g., `https://yourdomain.vercel.app`)
- `AUTH_SECRET` - A random secret for session encryption

### Required for Sanity (Blog)

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION` - Your Sanity API version (optional, defaults to "2024-02-28")
- `SANITY_API_READ_TOKEN` - Your Sanity API read token (for draft mode)

### Required for Submodules (Private Packages)

- `GITHUB_REPO_CLONE_TOKEN` - A GitHub personal access token with repo access to clone private submodules

## Build Process

The build script runs the following in order:

1. `prebuild`: Runs `pnpm generate:api` to generate the API client from your OpenAPI spec
2. `build`: Runs `pnpm db:generate` to generate Prisma client, then `next build`

Make sure your API server is accessible during build time so Orval can fetch the OpenAPI specification.
