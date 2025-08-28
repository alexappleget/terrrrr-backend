---
sidebar_position: 1
---

# `requireAuth`

The `requireAuth` middleware protects routes by ensuring only authenticated users can access them. If the JWT token in the request cookies is valid, the decoded JWT payload is attached to `request.user` and passed to the next route handler. This allows the route handler to access user information and confirms the request is authenticated.

## Usage

Apply `requireAuth` to any route that requires authentication:

```typescript
router.get("/protected", requireAuth, functionName); // Only accessible if authenticated
```

## Flow

1. Retrieves the JWT token from `request.cookies.token`.
   - `request.cookies` contains all cookies sent by the client and `token` is the name of that specific cookie which contains the JWT that we need to check and validate if the user is authenticated.
2. If no token is present, responds with `400 Bad Request` and an error message.
3. Verifies the token using the server's `JWT_SECRET`.
   - `JWT_SECRET` is an env variable that stores the secret key for signing and verifying JWTs.
4. If the JWT token is valid:

   - decodes the JWT payload and attaches it to `request.user`.

     - This makes the authenticated user's information available to all subsequent middleware and route handlers.

     Example:

     ```typescript
     const { id: userId } = request.user!;
     ```

5. Calls `next()` to proceed to the route handler.
   - `next()` is an Express function that passes control to the next middleware or route handler in the stack. If authentication succeeds, this allows the request to continue to the intended endpoint.
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
