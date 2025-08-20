# Auth Controller Documentation

## Overview

The `auth.controller.ts` file handles user authentication using **JWT tokens** and **refresh tokens**. Authentication is handled via **httpOnly cookies** to improve security and prevent XSS attacks.

## Key Functions

### `session`

Verifies the user's current JWT session.

**Flow:**

1. Retrieves the JWT token from the **httpOnly cookie**.
2. Checks if the token exists. If not, returns an error.
3. Verifies the token's validity and checks for expiration.
4. If the token is expired, it triggers the `refresh` function automatically.

### `refresh`

Rotates the JWT and refresh token, issuing new tokens.

**Flow:**

1. Retrieves the **refresh token** from a separate httpOnly cookie.
2. Checks if the refresh token exists and whether it **matches the token stored in the database** for that user.
3. If valid:
   - Generates a new JWT token (expires every 15 minutes).
   - Generates a new refresh token using `crypto.randomBytes(64).toString("hex")` for security.
4. Updates the database with the **new refresh token string**. This ensures that old refresh tokens cannot be reused, enhancing security.
5. Reissues **httpOnly cookies** for both the new JWT and the new refresh token, refreshing their duration.

**Explanation:**

- The refresh token is a randomly generated string stored in the database.
- Whenever the JWT expires (every 15 minutes), the backend uses this refresh token to validate the user's session.
- If the refresh token matches the stored value, a **new JWT** and a **new refresh token** are created.
- The refresh token in the database is replaced with the new one, and both tokens are sent to the client in **httpOnly cookies**.
- This rotation ensures that a stolen or reused refresh token cannot be exploited.

## Error Handling & Security Considerations

- **Missing Tokens:**
  If the JWT or refresh token is missing, the controller responds with a `400 Bad Request` and an error message.

- **Invalid Tokens:**
  If the JWT or refresh token is invalid or expired, the controller responds with a `400 Bad Request` and an error message, preventing unauthorized access.

- **Token Rotation:**
  Refresh tokens are rotated on each successful refresh. Old tokens are replaced in the database, reducing the risk of replay attacks.

- **httpOnly Cookies:**
  Both JWT and refresh tokens are stored in httpOnly cookies, making them inaccessible to client-side scripts and protecting against XSS attacks.

- **Secure Cookie Flags:**
  In production, cookies are set with the `secure` and `sameSite="none"` flags to ensure they are only sent over HTTPS and to mitigate CSRF risks.

- **Error Responses:**
  All errors are returned in a consistent JSON format, making it easier for clients to handle authentication failures.

## Example Requests & Responses

### Session Endpoint

**Request:**

```http
GET /api/auth/session
Cookie: token=<JWT_TOKEN>
```

**Successful Response:**

```json
{
  "authenticated": true
}
```

**Error Response (missing or invalid token):**

```json
{
  "authenticated": false,
  "error": "No token"
}
```

or

```json
{
  "authenticated": false,
  "error": "Invalid token"
}
```

---

### Refresh Endpoint

**Request:**

```http
GET /api/auth/refresh
Cookie: refreshToken=<REFRESH_TOKEN>
```

**Successful Response:**

```json
{
  "success": true
}
```

**Error Response (missing or invalid refresh token):**

```json
{
  "error": "No refresh token"
}
```

or

```json
{
  "error": "Invalid refresh token"
}
```

---

## Usage Instructions

1. **Sign In:**
   On successful login, the backend sets both `token` and `refreshToken` as httpOnly cookies.
2. **Session Validation:**
   Use the `api/auth/session` endpoint to check if the user is authenticated. The backend verifies the JWT token.
3. **Token Refresh:**
   If the JWT token expires, call `/api/auth/refresh` with the `refreshToken` cookie. The backend will issue new tokens and update the cookies.
4. **Sign Out:**
   To log out, clear both `token` and `refreshToken` cookies on the client side.

## Dependencies

- **express**: Handles HTTP requests and responses.
- **jsonwebtoken**: Used for creating and verifying JWT tokens.
- **crypto**: Generates secure random refresh tokens.
- **prisma**: ORM for PostgreSQL database operations.

## Troubleshooting

- **Cookie Not Set:**  
  Ensure your frontend sends requests with credentials and your backend sets cookies with the correct domain and path.
- **Token Mismatch:**  
  If refresh tokens do not match, verify that the database is updating tokens correctly and cookies are not being overwritten.
- **Invalid Token Errors:**  
  Check that the JWT secret matches between token creation and verification.
