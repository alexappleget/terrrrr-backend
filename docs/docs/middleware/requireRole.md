---
sidebar_position: 2
---

# `requireRole`

The `requireRole` middleware restricts access to routes based on user roles. It ensures that only users with the specified role(s) can access the protected route.

## Usage

Apply `requireRole` to any route that requires role-based authorization:

```typescript
router.get("/owner-route", requireAuth, requireRole(["OWNER"]), getAdminData);
router.get("/admin-route", requireAuth, requireRole(["OWNER", "ADMIN"]));
```

## Flow

1. Checks the request method:
   - If `GET`, retrieves the user's role from `request.query.userRole`.
   - Otherwise, retrieves the user's role from `request.body.userRole`.
2. If no role is provided or the role is not a string, responds with `401 Unauthorized`.
3. Checks if the required roles are an array:
   - If so, verifies that the user's role matches one of the allowed roles.
   - If not, checks if the user's role matches the single allowed role.
4. If the user's role does not match any allowed roles, responds with `401 Unauthorized`.
5. If the role matches, the function will then call `next()` which will pass control to the next middleware or route handler.

## Example Error Responses

- **No Role Provided:**
  ```json
  { "error": "Unauthorized: No role found." }
  ```
- **Role Not Allowed:**
  ```json
  { "error": "Unauthorized" }
  ```

## Dependencies

- **Express**: Handles HTTP requests and responses.
- **IAuthenticatedRequest**: Custom type for authenticated requests.

## Notes

- Use in combination with `requireAuth` to ensure both authentication and authorization.
- Supports both single role and multiple roles for flexible access control.
