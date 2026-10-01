import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

/**
 * POST handler for logging analytics and review events.
 * This endpoint receives event data from the frontend and stores it in the database
 * to track user interactions (like viewing suggestions or copying text).
 * 
 * @param req - The incoming HTTP request containing event data in JSON format
 * @returns NextResponse with success status or error message
 */
export async function POST(req: Request) {
  try {
    // Parse the incoming JSON payload
    const body = await req.json();
    const { eventType, rating, metadata } = body;
    
    // Generate a unique session ID for this event to track anonymous user sessions
    const sessionId = crypto.randomUUID();

    // Store the event in the database using Prisma
    const event = await prisma.reviewEvent.create({
      data: {
        sessionId,
        eventType: eventType || "UNKNOWN_EVENT",
        rating: rating || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      }
    });

    // Return the successfully created event ID
    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Event logging failed:", error);
    
    // Return a generic 500 error to the client
    return NextResponse.json(
      { error: "Failed to log event" },
      { status: 500 }
    );
  }
}
