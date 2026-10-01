import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventType, rating, metadata } = body;
    
    const sessionId = crypto.randomUUID();

    const event = await prisma.reviewEvent.create({
      data: {
        sessionId,
        eventType: eventType || "UNKNOWN_EVENT",
        rating: rating || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      }
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("Event logging failed:", error);
    return NextResponse.json(
      { error: "Failed to log event" },
      { status: 500 }
    );
  }
}
