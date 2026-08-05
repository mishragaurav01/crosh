# Crosh Authentication Flow

## Authentication Flow

1. **Register** 
   - HTTP `POST /api/v1/auth/register`
   - Client sends User payload. Server constructs user in the repository.
   - Automatically kicks off a Session via `CreateSessionService`.
   - Returns HttpOnly cookies holding both tokens.

2. **Login**
   - HTTP `POST /api/v1/auth/login`
   - Validate credentials and activate Auth Services.
   - Access Token set into short-lived HttpOnly cookie (`15min`).
   - Refresh Token hashed in DB and set into long-lived HttpOnly cookie (`7d`).

3. **Protected APIs**
   - e.g., `GET /api/v1/users/me`
   - Express fetches `req.cookies.accessToken`.
   - Payload is verified against `JwtUtility` and populated seamlessly inside `req.user`.

4. **Refresh Session**
   - Expired Access Token?
   - HTTP `POST /api/v1/auth/refresh`
   - Passes `req.cookies.refreshToken`. Verifies footprint hash vs Database session mapping.
   - Generates updated cookies bridging continuous authentication seamlessly.

5. **Logout**
   - Destroys DB tracking via `RevokeSessionService`.
   - Fires `res.clearCookie()` intercepting all payload leaks directly at HTTP perimeter layer.


## Lifecycle Breakdowns

**JWT Lifecycle** 
Token expires independently in 15 minutes. Pure stateless footprint verified cryptographically without database hits. `JwtUtility` isolates crypto-hashing mechanics safely.

**Session Lifecycle**
Tethered physically to MongoDB collections. A revoked DB hash invalidates Token rotation immediately, allowing remote administration logouts manually (API hardened against session hijacking).

**Cookie Flow**
- `SameSite` constraints lock CSRF scopes.
- `HttpOnly` drops XSS exposure by locking `Document.cookie` hooks natively out of JavaScript reach.
- `secure: isProduction` forces HTTPS during cluster environments protecting data traversal.
