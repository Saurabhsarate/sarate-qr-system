import { z } from "zod";

export const reviewEventSchema = z.object({
  eventType: z.enum([
    "QR_SCAN", 
    "RATING_SELECTED", 
    "FEEDBACK_GENERATED", 
    "FEEDBACK_COPIED", 
    "GOOGLE_REVIEW_CLICKED"
  ]),
  rating: z.number().min(1).max(5).optional().nullable(),
  metadata: z.any().optional()
});

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  feedbackText: z.string().optional(),
  serviceType: z.string().optional()
});
