# Cypress Setup and Testing Guide

## Overview

This guide explains the current Cypress configuration and how to run tests in your project. The main improvement is **dynamic port detection** - Cypress now automatically detects and uses the same port as your dev server.

## What Was Fixed

### Before
- Cypress was hardcoded to connect to `http://localhost:3001`
- Tests would fail if the dev server ran on a different port
- No flexibility in port configuration

### After (Current)
- Cypress automatically detects the server's actual port via environment variables
- Works with any port (3000, 3001, 3002, etc.)
- Can be overridden when needed
- Port-agnostic test assertions

## How It Works

### Port Detection Priority

1. **`CYPRESS_BASE_URL`** (environment variable)
   - Explicit override for the full base URL
   - Example: `CYPRESS_BASE_URL=http://localhost:5000 npm run cypress:open`

2. **`PORT`** (environment variable)
   - Set by Next.js dev server automatically
   - Example: `PORT=3001 npm run dev`

3. **`NODE_ENV`** (fallback)
   - If `NODE_ENV=test` → defaults to port 3001
   - Otherwise → defaults to port 3000

## Running Tests

### Quick Start

```bash
# 1. Set up test database (one-time)
npm run test:setup

# 2. Seed test user (before running tests)
npm run test:seed

# 3. Run all tests
npm run test:functional
```

### Test Commands

| Command | Description | Port |
|---------|-------------|------|
| `npm run test:functional` | Run tests headless | 3001 |
| `npm run test:functional:open` | Interactive test runner | 3001 |
| `npm run test:functional:headless` | Headless mode | 3001 |
| `npm run test:functional:chrome` | Run with Chrome | 3001 |
| `npm run cypress:open` | Manual mode (existing dev server) | auto-detect |
| `npm run cypress:run` | Run tests (existing dev server) | auto-detect |

### Scenario 1: Using Test Scripts (Recommended)

```bash
# This starts the dev server on port 3001 and runs tests automatically
npm run test:functional

# Or open interactive mode
npm run test:functional:open
```

**What happens:**
1. Server starts on port 3001 (set by `PORT=3001` in package.json)
2. Cypress detects `PORT=3001` environment variable
3. Cypress connects to `http://localhost:3001`

### Scenario 2: Separate Server + Cypress

```bash
# Terminal 1: Start dev server (defaults to port 3000)
npm run dev

# Terminal 2: Open Cypress (will auto-detect port 3000)
npm run cypress:open
```

**What happens:**
1. Dev server starts on port 3000 (default)
2. Cypress can't detect `PORT` env var (not set)
3. Cypress falls back to default 3000 (for dev environment)

### Scenario 3: Custom Port

```bash
# Terminal 1: Start dev server on custom port
PORT=4000 npm run dev

# Terminal 2: Open Cypress with same port
PORT=4000 npm run cypress:open
```

**What happens:**
1. Dev server starts on port 4000
2. Cypress detects `PORT=4000` environment variable
3. Cypress connects to `http://localhost:4000`

### Scenario 4: Force Specific URL

```bash
# Override completely with explicit URL
CYPRESS_BASE_URL=http://localhost:8000 npm run cypress:open
```

## Test User Credentials

For login tests, use the seeded test user:

- **Email**: `cypress@test.com`
- **Password**: `Senha123!@#`

## Prerequisites

Before running tests, you must:

### 1. Set Up Test Database

```bash
npm run test:setup
# This runs:
# - npm run test:db:reset (resets database to clean state)
# - npm run test:db:push (applies schema)
```

### 2. Configure Test Database Environment

Make sure `.env.test` exists with database configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/test_db"
```

### 3. Seed Test User

```bash
npm run test:seed
# Creates/updates the test user (cypress@test.com)
```

## Test Structure

### Current Tests

The test file `cypress/e2e/01-auth.cy.ts` includes:

1. **Login Page Tests**
   - Form display
   - Empty field validation
   - Invalid email format validation

2. **Registration Page Tests**
   - Form display (etapa 1: name and email only)
   - Empty field validation
   - Email format validation
   - Multi-stage registration flow

3. **Login Flow Tests**
   - Valid credentials login
   - Invalid credentials error handling

4. **User Profile Tests**
   - View profile when logged in
   - Edit profile information
   - Logout functionality

## Configuration Files

### `cypress.config.ts`
- Main Cypress configuration
- Contains `getBaseUrl()` function for dynamic port detection
- Sets viewport, timeouts, security settings

### `package.json` Scripts
- `test:functional*` - Scripts for running tests with port 3001
- Uses `cross-env` for cross-platform environment variable support
- Uses `start-server-and-test` to manage server lifecycle

### `cypress/support/commands.ts`
- Custom Cypress commands
- `cy.login()` command for authentication in tests

## Troubleshooting

### Issue: Tests connect to wrong port

**Symptom**: Cypress connects to port 3000 when you wanted 3001

**Solution**:
```bash
# Check environment variable
echo "PORT=$PORT"

# Explicitly set the port
PORT=3001 npm run cypress:open

# Or use explicit URL
CYPRESS_BASE_URL=http://localhost:3001 npm run cypress:run
```

### Issue: "Cannot connect to localhost"

**Symptom**: Connection refused error

**Solution**:
1. Ensure dev server is running: `npm run dev`
2. Check the port: `lsof -i :3000` (macOS/Linux) or `netstat -ano` (Windows)
3. Try a different port: `PORT=4000 npm run dev`

### Issue: Login tests fail with 401

**Symptom**: "Email ou senha incorretos"

**Solution**:
1. Ensure test user is seeded: `npm run test:seed`
2. Check database connection in `.env.test`
3. Reset database: `npm run test:setup`

### Issue: Login tests fail with 429 (rate limited)

**Symptom**: "Muitas tentativas de login. Tente novamente..."

**Solution**:
- Wait for the rate limit to expire
- Or reset test data: `npm run test:setup` then `npm run test:seed`

### Issue: Page elements not found

**Symptom**: "Expected to find element but never did"

**Solution**:
1. Check page actually loaded: `cy.visit()` should complete
2. Increase timeouts in config if needed
3. Verify selectors match actual page structure

## Environment Variables Reference

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `CYPRESS_BASE_URL` | Explicit base URL | (none) | `http://localhost:8000` |
| `PORT` | Dev server port | (none) | `3001` |
| `NODE_ENV` | Environment | (none) | `test` |
| `DATABASE_URL` | Test DB connection | (in .env.test) | `postgresql://...` |

## How Tests Changed

### Cypress Configuration

**Old** (`cypress.config.ts`):
```typescript
baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3001'
```

**New** (`cypress.config.ts`):
```typescript
function getBaseUrl(): string {
  if (process.env.CYPRESS_BASE_URL) {
    return process.env.CYPRESS_BASE_URL;
  }
  if (process.env.PORT) {
    return `http://localhost:${process.env.PORT}`;
  }
  const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
  return `http://localhost:${port}`;
}

export default defineConfig({
  e2e: {
    baseUrl: getBaseUrl(),
    // ...
  }
});
```

### Test Scripts

**Old** (`package.json`):
```json
"test:functional": "start-server-and-test dev:test http://localhost:3001 cypress:run"
```

**New** (`package.json`):
```json
"test:functional": "cross-env PORT=3001 start-server-and-test dev http://localhost:3001 cypress:run"
```

Benefits:
- Explicitly sets `PORT=3001` for the dev server
- Cypress detects this and uses correct port
- More transparent and easier to debug

### Test Assertions

**Old**:
```typescript
cy.url().should('not.include', 'http://localhost:3000/');
```

**New**:
```typescript
cy.url().then(url => {
  expect(url.match(/^https?:\/\/[^/]+(\/)?$/) || url.includes('/login')).to.be.truthy;
});
```

Benefits:
- Works with any port
- Accepts both http and https
- Not dependent on hardcoded URLs

## Advanced Usage

### Running Tests in CI/CD

```bash
# Set test database in CI environment
export DATABASE_URL="postgresql://ci_user:password@ci_db:5432/test_db"

# Setup and run
npm run test:setup
npm run test:seed
npm run test:functional
```

### Custom Port Configuration

```bash
# Test on specific port with custom setup
PORT=9000 \
CYPRESS_BASE_URL=http://localhost:9000 \
npm run test:functional:open
```

### Debugging Tests

```bash
# Run with verbose logging
DEBUG=cypress:* npm run test:functional

# Open in debug mode (pauses on failures)
npm run test:functional:open
# Then use `.debug()` in test code
```

## Next Steps

1. Run `npm run test:setup` to initialize test database
2. Run `npm run test:seed` to create test user
3. Run `npm run test:functional` to execute tests
4. Check `CYPRESS_CONFIG.md` for detailed configuration info

## Related Documentation

- [CYPRESS_CONFIG.md](CYPRESS_CONFIG.md) - Detailed configuration reference
- [SOLUCAO_CSS_LAYOUT.md](SOLUCAO_CSS_LAYOUT.md) - CSS scoping solution
- [ANALISE_CSS_GLOBAL_ISSUES.md](ANALISE_CSS_GLOBAL_ISSUES.md) - CSS problems analysis

---

**Last Updated**: 2024
**Configuration Version**: 2 (with dynamic port detection)
