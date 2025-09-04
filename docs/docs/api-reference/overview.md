---
sidebar_position: 1
---

# Overview

Welcome to the Terrrrr API Reference.
This section provides detailed documentation for all available API endpoints, including authentication, usage examples, and error handling.

## How to Use This API

- All endpoints are prefixed with `/api/`.
- Authentication is required for most routes (see [Authentication Guide](../category/middleware)).
- Data is exchanged in JSON format.

## Available Controllers

- **Auth:** Session validation and token refreshing.
- **Boss:** Manages world boss data, including retrieving boss lists and updating boss progress.
- **Event:** Manages world events, including creation, scheduling, and RSVP functionality.
- **Note:** Handles creation and management of notes with worlds.
- **User:** Manages user accounts, profiles, and related user-specific operations.
- **World:** Handles creation and management or worlds, including world details and settings.
- **World Membership:** Manages user membership in worlds, including roles and permissions.

## Quick Start

1. Authenticate using the `/api/auth/session` endpoint.
2. Use your JWT token (sent as a cookie) for protected routes.
3. Refer to each controller's documentation for endpoint details and examples.

## Error Handling

- Standard error responses include an `error` field with a message.
- Common HTTP status codes: `200 Success`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `500 Internal Server Error`.

---

Browse the sidebar for detailed docs on each controller and endpoint.
