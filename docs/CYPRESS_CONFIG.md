# Cypress Configuration - Dynamic Port Detection

## Overview

Cypress is now configured to **dynamically detect and use the server's actual port** instead of being hardcoded to 3001.

## How It Works

The `cypress.config.ts` file contains a `getBaseUrl()` function that implements a priority-based port detection:

### Priority Order:

1. **`CYPRESS_BASE_URL` environment variable** (explicit override)
   - Highest priority - use this when you need to test against a specific URL
   - Example: `CYPRESS_BASE_URL=http://localhost:4000 npm run cypress:open`

2. **`PORT` environment variable** (set by dev/test scripts)
   - Set by Next.js when you run dev or test scripts
   - Example: `PORT=3001 npm run dev` → Cypress uses `http://localhost:3001`

3. **Default based on `NODE_ENV`**
   - If `NODE_ENV=test` → defaults to port 3001
   - Otherwise → defaults to port 3000

## Running Tests

### Option 1: Using Test Scripts (Recommended)

```bash
# Run Cypress tests (starts server on 3001 and runs tests)
npm run test:functional

# Open Cypress UI for interactive testing (starts server on 3001)
npm run test:functional:open

# Run in headless mode
npm run test:functional:headless

# Run with Chrome
npm run test:functional:chrome
```

All these scripts automatically:
- Set `PORT=3001` for the dev server
- Cypress automatically detects this and connects to `http://localhost:3001`

### Option 2: Manual Dev Server + Cypress

```bash
# Terminal 1: Start dev server (uses default port 3000)
npm run dev

# Terminal 2: Open Cypress UI (will connect to http://localhost:3000)
npm run cypress:open

# Or run tests against the dev server
npm run cypress:run
```

### Option 3: Custom Port

```bash
# Start dev server on custom port
PORT=4000 npm run dev

# In another terminal, run Cypress
# (it will automatically detect PORT=4000 and use http://localhost:4000)
PORT=4000 npm run cypress:open
```

### Option 4: Override with Environment Variable

```bash
# Force Cypress to use a specific URL regardless of PORT
CYPRESS_BASE_URL=http://localhost:5000 npm run cypress:open
```

## Before Running Tests

### 1. Ensure Test Database is Set Up

```bash
# Reset and push schema to test database
npm run test:setup

# Or individually:
npm run test:db:reset     # Reset database
npm run test:db:push      # Push schema
```

### 2. Seed Test User

```bash
# Create/update the test user (cypress@test.com / Senha123!@#)
npm run test:seed
```

The test user credentials are:
- **Email**: `cypress@test.com`
- **Password**: `Senha123!@#`

## Test Database Configuration

Tests use a separate `.env.test` file for database configuration:

```bash
# .env.test
DATABASE_URL="postgresql://user:password@host:port/test_database"
```

Make sure your test database is properly configured in `.env.test`.

## Example Workflow

```bash
# 1. Set up test database
npm run test:setup

# 2. Create test user
npm run test:seed

# 3. Run all tests
npm run test:functional

# Or open Cypress UI for interactive testing
npm run test:functional:open
```

## Environment Variables Reference

| Variable | Purpose | Priority |
|----------|---------|----------|
| `CYPRESS_BASE_URL` | Override the full base URL | 1 (Highest) |
| `PORT` | Set server port (used by Next.js) | 2 |
| `NODE_ENV` | Determine default port if others not set | 3 |

## Debugging

If Cypress is connecting to the wrong port:

1. **Check what port is being detected:**
   ```bash
   npm run cypress:open
   ```
   Look at the "Settings" in Cypress UI to see the configured base URL

2. **Print environment variables:**
   ```bash
   echo "PORT: $PORT"
   echo "NODE_ENV: $NODE_ENV"
   echo "CYPRESS_BASE_URL: $CYPRESS_BASE_URL"
   ```

3. **Force specific port:**
   ```bash
   PORT=3001 CYPRESS_BASE_URL=http://localhost:3001 npm run cypress:run
   ```

## What Changed

Previously:
- Cypress was hardcoded to `http://localhost:3001`
- Tests would fail if server ran on a different port
- No flexibility in port configuration

Now:
- Cypress automatically detects the server's actual port
- Works with dynamic ports (3000, 3001, 3002, etc.)
- Can be overridden with `CYPRESS_BASE_URL` or `PORT` environment variables
- Test and dev modes use appropriate default ports

## Common Issues

### Issue: "Cypress cannot connect to localhost:3001"

**Solution**: Ensure the dev server is running and the port is correct:
```bash
npm run test:functional  # This starts the server automatically
```

### Issue: "Login test fails with 401"

**Solution**: Make sure test user is seeded:
```bash
npm run test:seed
```

### Issue: "Tests timeout waiting for page load"

**Solution**: Check that the correct port is being used:
```bash
PORT=3001 npm run cypress:run
```
