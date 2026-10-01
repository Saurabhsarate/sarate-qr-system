import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

/**
 * NextAuth configuration object.
 * Handles the authentication strategy, providers, and session management for the admin panel.
 */
export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Define the login form fields expected by NextAuth
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      /**
       * Authorization logic that runs when a user attempts to log in.
       * @param credentials - The email and password provided by the user
       * @returns The user object if successful, or null if authentication fails
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Reject if fields are missing
        }

        // 1. Fallback / Initial Setup Authentication
        // Check if the credentials match the hardcoded admin configured in environment variables
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin-env", email: credentials.email, name: "Admin" };
        }

        // 2. Database Authentication
        // Query the database for a user matching the provided email
        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null; // Reject if user not found in DB

        // Verify the password hash securely using bcrypt
        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) return null; // Reject if password doesn't match

        // Authentication successful, return the user session object
        return {
          id: user.id,
          email: user.email,
          name: "Admin"
        };
      }
    })
  ],
  // Session configuration
  session: {
    strategy: "jwt", // Use JSON Web Tokens for stateless sessions
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 Days
  },
  // Custom pages configuration
  pages: {
    signIn: "/login", // Redirect unauthorized users to our custom login page
  },
  // Secret key used to encrypt the JWT tokens (must be securely stored in .env)
  secret: process.env.NEXTAUTH_SECRET,
};
