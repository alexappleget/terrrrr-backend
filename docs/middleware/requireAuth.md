# requireAuth Middleware Documentation

## Overview

The `requireAuth` middleware protects routes by ensuring only authenticated users can access them. If the JWT token in the request cookies is valid, the decoded JWT payload is attached to `request.user` and passed to the next route handler. This allows the route handler to access user information and confirms the request is authenticated.

## Usage

Apply `requireAuth` to any route that requires authentication:

```typescript
router.get("/protected", requireAuth, functionName); // Only accessible if authenticated
```

## Flow

1. Retrieves the JWT token from `request.cookies.token`.
2. If no token is present, responds with `400 Bad Request` and an error message.
3. Verifies the token using the server's `JWT_SECRET` (an environment variable that stores the secret key for signing and verifying JWTs).
4. If the JWT token is valid, decodes the JWT payload and attaches it to `request.user`. This makes the authenticated user's information available to all subsequent middleware and route handlers.
5. Calls `next()` to proceed to the route handler.
6. If verification fails, responds with `500 Internal Server Error` and the error.

## Example Error Responses

- **Missing/Invalid Token:**
  ```json
  { "error": "No token provided" }
  ```

## Dependencies

- **Express**: Handles HTTP requests and responses.
- **Jsonwebtoken**: Used for creating and verifying JWT tokens.
- **IAuthenticatedRequest && IAuthPayload**: Custom types for authenticated requests.
