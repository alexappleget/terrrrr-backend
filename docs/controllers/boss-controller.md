# Boss Controller Documentation

## Table of Contents

- [Overview](#overview)
- [Key Functions](#key-functions)
  - [getWorldBosses](#getworldbosses)
  - [setBossKilledState](#setbosskilledstate)
- [Error Handling](#error-handling)
- [Example Requests & Responses](#example-requests--responses)
  - [Get World Bosses](#get-world-bosses)
  - [Set Boss Killed State](#set-boss-killed-state)
- [Usage Instructions](#usage-instructions)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)

## Overview

The `boss.controller.ts` file manages world boss data and their progress states. It provides endpoints to retrieve all bosses for a world and to update the killed state of a boss.

> **Note:**
> All boss routes use the `requireAuth` middleware to ensure the user is authenticated.
> The `PATCH /api/boss/:id` route also uses `requireRole` to restrict access to users with the roles: OWNER, ADMIN, or SUB_ADMIN.
> For more details, see the [requireAuth](../middleware/requireAuth.md) and [requireRole](../middleware/requireRole.md) documentation.

## Key Functions

### `getWorldBosses`

Retrieves all bosses for a given world, including their progress.

**Flow:**

1. Extracts the `id` parameter from the request at the endpoint `/api/boss/:id` (where `id` is the world ID).
2. Queries the database for all bosses, including their progress for the specified world.
3. Maps the results to include only the relevant progress for each boss.
4. Returns a JSON response with the list of bosses and their progress.

### `setBossKilledState`

Updates the killed state of a specific world boss.

**Flow:**

1. Extracts the `id` parameter from the request at the endpoint `/api/boss/:id` (where `id` is the progress ID).
2. Reads the `killed` value from the request body.
3. Updates the killed state in the database for the specified boss progress.
4. Returns a success response.

## Error Handling

- All errors are caught and returned as a `500 Internal Server Error` with the error details in the response JSON.

## Example Requests & Responses

### Get World Bosses

**Request:**

```http
GET /api/boss/:id
```

**Successful Response:**

```json
{
  "bosses": [
    {
      "id": "boss1",
      "name": "Dragon Lord",
      "health": "2500",
      "stage": "pre-hardmode",
      "worldProgress": {
        "id": "progress1",
        "bossId": "boss1",
        "worldId": "world1",
        "killed": false
      }
    }
    // ...more bosses
  ]
}
```

**Error Response:**

```json
{
  "error": "Error details"
}
```

---

### Set Boss Killed State

**Request:**

```http
PATCH /api/boss/:id
Content-Type: application/json

{
  "killed": true | false
}
```

**Successful Response:**

```json
{
  "success": true
}
```

**Error Response:**

```json
{
  "error": "Error details"
}
```

---

## Usage Instructions

1. **Retrieve Bosses:**
   Use `/api/boss/:id` to get all bosses and their progress for a specific world.
2. **Update Boss State:**
   Use `PATCH /api/boss/:id` with a JSON body `{ "killed": true|false }` to update the killed state of a boss.

## Dependencies

- **Express**: Handles HTTP requests and responses.
- **Prisma**: ORM for PostgreSQL database operations.
