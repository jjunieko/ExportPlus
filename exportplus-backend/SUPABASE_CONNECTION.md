# Supabase Connection Configuration

## Issue
Prisma migrations and introspection require a **direct connection** to the database, not the connection pooler.

## Solution

### Get the Correct Connection Strings from Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Find the **Connection string** section
4. You'll need TWO different connection strings:

#### 1. Connection Pooler (for DATABASE_URL)
- Use the **Connection Pooling** option
- Format: `postgresql://user:pass@aws-X-region.pooler.supabase.com:6543/db?pgbouncer=true`
- Port: **6543**
- Use this for application queries (DATABASE_URL)

#### 2. Direct Connection (for DIRECT_URL)
- Use the **Direct connection** or **Session mode** option
- Format: `postgresql://user:pass@aws-X-region.supabase.co:5432/db`
- Port: **5432**
- Hostname: Usually `aws-X-region.supabase.co` (note: `.co` not `.com`, and NO `.pooler`)
- Use this for migrations and introspection (DIRECT_URL)

### Update your .env file

```env
# Connection Pooler - for application queries
DATABASE_URL="postgresql://postgres.xxx:password@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct Connection - for migrations/introspection
DIRECT_URL="postgresql://postgres.xxx:password@aws-1-us-east-1.supabase.co:5432/postgres"
```

### Important Notes

- The direct connection URL should **NOT** contain `.pooler` in the hostname
- The direct connection typically uses `.supabase.co` domain (not `.com`)
- Port 5432 is for direct connections, port 6543 is for the pooler
- Make sure your Supabase project is **active** (free tier projects pause after inactivity)

### Verify Connection

Test the direct connection:
```bash
psql "postgresql://postgres.xxx:password@aws-1-us-east-1.supabase.co:5432/postgres"
```

If this fails, check:
1. Your Supabase project is not paused
2. Your IP is allowed (check Supabase dashboard → Settings → Database → Connection Pooling)
3. You're using the correct credentials

