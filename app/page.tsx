"use client";

import { useState } from "react";
import { RatingStars } from "@/components/RatingStars";
import { FeedbackForm } from "@/components/FeedbackForm";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";

export default function CustomerReviewPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/CfL9_scZQe-IEAE/review";

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="bg-[#0f172a] p-8 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            SARATE SURVEYOR
          </h1>
          <p className="text-yellow-400 mt-2 text-sm font-medium tracking-wide">
            Precision Today. Better Tomorrow.
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
            How was your experience?
          </h2>
          
          <RatingStars rating={rating} onRatingChange={setRating} />

          {rating > 0 && (
            <div className="animate-in fade-in duration-500">
              <FeedbackForm 
                rating={rating} 
                currentFeedback={feedback}
                onFeedbackChange={setFeedback}
              />
              
              <GoogleReviewButton 
                rating={rating}
                feedback={feedback}
                googleReviewUrl={googleReviewUrl}
              />
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium">Since 1996 • 28+ Years of Experience</p>
        </div>
      </div>
    </main>
  );
}
