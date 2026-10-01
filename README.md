# Sarate Surveyor Review System

A QR-based customer feedback and Google Review assistance platform for Sarate Surveyor.

## Architecture & Tech Stack

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Authentication**: NextAuth.js (Admin Only)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

*   `DATABASE_URL`: Your PostgreSQL connection string.
*   `NEXTAUTH_SECRET`: A secure random string for JWT encryption.
*   `NEXTAUTH_URL`: The base URL of the application.
*   `NEXT_PUBLIC_APP_URL`: The base URL for the application (used in QR codes).
*   `GOOGLE_REVIEW_URL`: The official Google Review URL for Sarate Surveyor.
*   `ADMIN_EMAIL`: The email address for the admin dashboard.
*   `ADMIN_PASSWORD`: The password for the admin dashboard (will be hashed during setup).

## Database Setup

1. Run `npx prisma migrate dev` to create the database tables.
2. Run `npx prisma db seed` to insert default settings and the admin user.

## Running Locally

1. `npm install`
2. `npm run dev`

## Deployment

Designed for deployment on Vercel with a managed PostgreSQL database (like Vercel Postgres or Neon).

1. Push code to GitHub.
2. Import project into Vercel.
3. Configure environment variables in Vercel.
4. Run `npx prisma migrate deploy` during the build step.
