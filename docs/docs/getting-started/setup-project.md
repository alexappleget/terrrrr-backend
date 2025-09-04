---
sidebar_position: 1
---

# Setup Your Backend Project

Follow these steps to get the project repository running on your Windows machine.

---

## Step 1: Clone the Repository

### Cloning via GitKraken

- Copy the repository URL

```bash
https://github.com/alexappleget/terrrrr-backend.git
```

- Open **GitKraken** and click **"Clone"**
- **Paste the repository URL** into the URL field
- **Choose a local folder** where you want the project to be served, then click **"Clone the Repo!"**.

> Note: Once the cloning is complete, the repository will be available on your machine.

---

## Step 2: Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

This includes **Express**, **Prisma**, **JWT**, and other dependencies.

---

## Step 3: Configure Environment Variables

Copy the example environment file and update it with your local configuration:

```env
JWT_SECRET=secret key
DATABASE_URL=database url
FRONTEND_URL=http://localhost:3000
PORT=1234
```

> Note: Ensure your database is running before continuing.

---

## Step 4: Setup the Database

```bash
npx prisma generate
```

This will generate the most up to date prisma client for you to be able to use prisma for your functions.

---

## Step 5: Start the Backend

Run the backend server locally:

```bash
npm run dev
```

---

## Next Steps

- Check [API Reference](../category/api-reference) for available endpoints.
- Explore [Controllers & Routes](../category/controllers--routes) to understand backend logic.
