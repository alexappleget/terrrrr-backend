---
sidebar_position: 2
---

# Project Structure

This document explains how the project repository is structured. It explains how the backend uses route files to define API endpoints and controller files to handle the logic for each endpoint. Understanding this structure will help you navigate the codebase, add new features, and debug existing functionality.

---

## Example: Adding a New Feature Step-by-Step

Imagine you are given a task to add a new database schema model that doesn't exist yet, and you need to create a new route and controller function for it. Here's how you would do it:

### 1. Create the Prisma Model

First, add your new model to `prisma/schema.prisma`:

```prisma
model NewModel {
    id String @id @default(cuid())
    name String
    createdAt DateTime @default(now())
}
```

Then run `npx prisma db push` to update your database and then, run `npx prisma generate` to sync your prisma client with the new change.

---

### 2. Create Route and Controller Files

- **Route file:**
  Create `src/routes/new.routes.ts`
- **Controller file:**
  Create `src/controllers/new.controller.ts`

---

### 3. Register the Route in `app.ts`

In `src/app.ts`, import your new route and add it to the app:

```typescript
import newRoutes from "./routes/new.routes";

app.use("/api/new", newRoutes); // Always start with /api/ for consistency
```

---

### 4. Define Routes in Your Route File

In `src/routes/new.routes.ts`:

```typescript
import express from "express";
import { getNewModels, createNewModel } from "../controllers/new.controller";
import requireAuth from "../middleware/requireAuth";
import requireRole from "../middleware/requireRole";

const router = express.Router();

// If the route should be protected by authentication, add requireAuth as middleware.
// This ensures only authorized users can access the route.
router.post("/", requireAuth, createNewModel);

// If you need to restrict access to users with a specific role (e.g., ADMIN), use requireRole:
router.get("/", requireAuth, requireRole("ADMIN"), getNewModels);

export default router;
```

> **Note:**
>
> - Use `requireAuth` middleware for routes that require the user to be authenticated.
> - Use `requireRole` middleware if you need to restrict access to users with specific roles (e.g., OWNER, ADMIN, SUB_ADMIN, MEMBER)
> - Middleware helps protect sensitive routes and ensures only authorized users can perform certain actions.

---

### 5. Implement Controller Functions

In `src/controllers/new.controller.ts`:

```typescript
export const createNewModel = async (request: Request, response: Response) => {
  // Logic to create a new model
};

export const getNewModels = async (request: Request, response: Response) => {
  // Logic to fetch models
};
```

---

## Summary

- Add your schema to Prisma
- Create dedicated route and controller files.
- Register the route in `app.ts` using `/api/` prefix.
- Define each route and link to controller functions.
- Implement the logic in controllers.

This structure keeps the backend organized and makes it easy for anyone on the team to add new features or debug existing ones.
