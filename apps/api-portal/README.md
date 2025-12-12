# API Portal

Frontend application for managing Location Tracking API keys and usage.

## Features

- **Splash Page**: Landing page with "Create API Key" button (polygon.io style)
- **Authentication**: Auth0 integration for secure login
- **API Key Management**: Create, view, and delete API keys
- **Dashboard**: Overview of API usage and statistics
- **Usage Analytics**: Track API request patterns
- **Account Management**: View and manage account settings
- **Documentation**: Readme.io integration for API docs

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables (create `.env.local`):
```
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3001
AUTH0_ISSUER_BASE_URL=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
APP_BASE_URL=http://localhost:3001
API_BASE_URL=http://localhost:3333
NEXT_PUBLIC_README_PROJECT=your-readme-project
```

3. Run the development server:
```bash
pnpm dev
```

The app will be available at http://localhost:3001

## Readme.io Integration

To integrate Readme.io documentation:

1. Sign up for a Readme.io account
2. Create a new project
3. Set `NEXT_PUBLIC_README_PROJECT` to your Readme.io project identifier
4. The documentation will be embedded in the `/docs` page

## Flow

1. User visits splash page (`/`)
2. Clicks "Create API Key" button
3. Redirected to Auth0 login
4. After login, redirected to `/dashboard/keys?create=true`
5. API key is automatically created and displayed
6. User can manage keys, view usage, and access documentation

