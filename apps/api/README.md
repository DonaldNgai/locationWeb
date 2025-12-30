# Location API

A Fastify-based REST API for receiving, storing, and relaying location updates from mobile clients to developer applications.

## Features

- **High Performance**: Built on Fastify for maximum throughput
- **Real-time Streaming**: Server-Sent Events (SSE) for live location updates
- **OpenAPI Documentation**: Auto-generated Swagger/OpenAPI specs
- **Readme.com Integration**: Seamless integration with Readme.com for API documentation
- **Rate Limiting**: Configurable rate limits per API key
- **Authentication**: JWT (Auth0) for management endpoints, API keys for data endpoints

## Quick Start

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build

# Run in production
pnpm start
```

The API will start on `http://localhost:3333` by default.

## Endpoints

### Documentation

- `GET /docs` - Swagger UI for interactive API documentation
- `GET /openapi.json` - OpenAPI 3.0 specification (JSON format)
- `POST /readme/webhook` - Webhook endpoint for Readme.com integration

### Health Check

- `GET /health` - Health check endpoint

### Groups

- `POST /groups` - Create a new location group (requires JWT)
- `GET /groups` - List groups you own (requires JWT)
- `POST /groups/:groupId/join` - Request to join a group

### API Keys

- `POST /groups/:groupId/api-keys` - Create new API key (requires JWT)
- `GET /groups/:groupId/api-keys` - List API keys (requires JWT)

### Locations

- `POST /locations` - Submit location update (requires API key)
- `GET /stream` - Subscribe to live location events via SSE (requires API key)

## Readme.com Integration

This API is configured to work with [Readme.com](https://docs.readme.com/main/docs/about-readme) for API documentation hosting.

### Option 1: Manual Upload

1. Access the OpenAPI spec at: `https://your-api-domain.com/openapi.json`
2. In Readme.com, go to your API project settings
3. Navigate to "API Reference" → "OpenAPI"
4. Upload or paste the OpenAPI spec from `/openapi.json`

### Option 2: Webhook Integration (Automatic Updates)

1. Get your Readme.com API key from your Readme.com project settings
2. Set the `README_API_KEY` environment variable
3. In Readme.com, configure a webhook to call: `https://your-api-domain.com/readme/webhook`
4. The API will automatically sync your OpenAPI spec to Readme.com

### Option 3: URL-based Sync

1. In Readme.com, go to API Reference settings
2. Set the OpenAPI source URL to: `https://your-api-domain.com/openapi.json`
3. Readme.com will periodically fetch and update the spec automatically

## Environment Variables

```bash
# Server Configuration
PORT=3333                          # API server port
HOST=0.0.0.0                      # Bind address

# CORS Configuration
CORS_ORIGIN=http://localhost:3000  # Allowed CORS origins (comma-separated)

# Rate Limiting
RATE_LIMIT_MAX=300                 # Max requests per window
RATE_LIMIT_WINDOW=1 minute        # Time window for rate limiting

# Authentication
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_AUDIENCE=https://your-api-audience

# Readme.com Integration (Optional)
README_API_KEY=your-readme-api-key  # API key for webhook authentication

# API Metadata
API_VERSION=1.0.0                  # API version for documentation
```

## Authentication

### JWT Bearer Token (Management Endpoints)

For endpoints that manage groups and API keys, use Auth0 JWT tokens:

```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
  https://api.example.com/groups
```

### API Key (Data Endpoints)

For location data endpoints, use API keys:

```bash
curl -H "x-api-key: loc_abc123_secret456..." \
  -X POST https://api.example.com/locations \
  -d '{"deviceId": "device-1", "latitude": 37.7749, "longitude": -122.4194, "recordedAt": "2024-01-01T00:00:00Z"}'
```

## Development

### Project Structure

```
src/
├── index.ts          # Main server entry point
├── routes/           # API route handlers
│   ├── groups.ts
│   ├── api-keys.ts
│   └── locations.ts
├── services/         # Business logic
│   ├── api-keys.ts
│   └── bus.ts
├── utils/            # Utilities
│   ├── auth.ts
│   ├── api-key.ts
│   └── env.ts
└── types/            # TypeScript types
    └── location.ts
```

### Adding New Endpoints

1. Create route handler in `src/routes/`
2. Register route in `src/index.ts`
3. Add Zod schema validation
4. The OpenAPI spec will be automatically generated

## License

Private - All rights reserved

