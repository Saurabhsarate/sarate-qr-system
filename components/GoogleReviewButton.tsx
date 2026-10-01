"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { feedbackTemplates } from "./FeedbackForm";

interface GoogleReviewButtonProps {
  rating: number;
  feedback: string;
  googleReviewUrl: string;
}

export function GoogleReviewButton({ rating, feedback, googleReviewUrl }: GoogleReviewButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);

    try {
      const templates = feedbackTemplates[rating] || [];
      const matchedIndex = templates.indexOf(feedback);
      const wasEdited = matchedIndex === -1;
      const suggestionId = wasEdited ? null : matchedIndex + 1;

      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "GOOGLE_REVIEW_CLICKED",
          rating,
          metadata: { 
            finalFeedback: feedback,
            wasEdited,
            ...(suggestionId !== null && { suggestionId })
          }
        }),
      }).catch(console.error);

      // Automatically copy the feedback text to the user's clipboard
      try {
        await navigator.clipboard.writeText(feedback);
      } catch (err) {
        console.error("Auto-copy failed", err);
      }

      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
      router.push("/thank-you");
    } catch (error) {
      console.error("Navigation error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (rating === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <p className="text-sm text-gray-500 mb-4 text-center">
        Your feedback is ready. You can review or edit it before posting on Google.
      </p>
      
      <button
        onClick={handleContinue}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center space-x-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Continue to Google Review</span>
            <ExternalLink className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}
