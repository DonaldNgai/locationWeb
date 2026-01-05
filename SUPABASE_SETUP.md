# Supabase Real-time Setup

This application uses Supabase real-time capabilities to subscribe to database changes for pending group membership requests.

## Prerequisites

1. A Supabase project (sign up at https://supabase.com)
2. Your database hosted on Supabase (or configure Supabase to use your existing PostgreSQL database)

## Setup Instructions

### 1. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL** (this will be `NEXT_PUBLIC_SUPABASE_URL`)
   - **Publishable key** (format: `sb_publishable_...`) from the **API Keys** tab (this will be `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
   
   **Note**: If you don't see a publishable key, click **Create new API Keys** in the API Keys tab. Do not use the legacy `anon` key from the Legacy API Keys tab.

### 2. Enable Real-time on the `group_members` Table

1. In your Supabase dashboard, go to Database > Replication
2. Find the `group_members` table
3. Enable replication/publication for this table
4. Alternatively, you can enable it via SQL:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE group_members;
```

### 3. Set Environment Variables

Add the following environment variables to your `.env` or `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```

**Important**: 
- Use the **publishable key** (starts with `sb_publishable_`) for client-side code
- Never use secret keys (`sb_secret_...`) in client-side code - they should only be used in secure server-side components
- The publishable key is safe to expose in browser/client code as it has low privileges and is protected by Row Level Security

### 4. Configure Row Level Security (RLS) - Optional but Recommended

If you're using Supabase authentication, you may want to configure RLS policies. However, since this app uses Auth0, you may need to disable RLS or configure it appropriately for your use case.

### 5. Verify Connection

The real-time subscriptions will automatically start when:
- The environment variables are set
- The Supabase client is initialized
- Users visit the groups page

## How It Works

The application subscribes to changes on the `group_members` table filtered by:
- `group_id` (matches the current user's groups)
- `status = 'pending'` (only pending requests trigger updates)

When a new pending request is created, updated, or deleted, the UI automatically updates without requiring page refresh or polling.

## Troubleshooting

- **Real-time not working**: Check that environment variables are set and prefixed with `NEXT_PUBLIC_`
- **No updates received**: Verify that real-time is enabled on the `group_members` table in Supabase dashboard
- **Connection errors**: Ensure your Supabase project is active and the URL/key are correct
- **Using legacy keys**: Make sure you're using the new publishable key (`sb_publishable_...`) from the API Keys tab, not the legacy `anon` key. The legacy keys are JWT-based and will be deprecated.

## Key Differences: New vs Legacy Keys

The new publishable keys (`sb_publishable_...`) are recommended over the legacy `anon` JWT-based keys because they:
- Allow independent rotation without downtime
- Don't require JWT secret rotation
- Provide better security practices
- Are easier to manage and rotate

For more information, see the [Supabase API Keys documentation](https://supabase.com/docs/guides/api/api-keys).
