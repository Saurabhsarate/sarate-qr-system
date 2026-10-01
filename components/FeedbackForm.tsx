"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

export const feedbackTemplates: Record<number, string[]> = {
  1: [
    "The experience did not meet my expectations, and there were areas that could have been handled better.",
    "I was not fully satisfied with the service and expected better communication and execution.",
    "The overall experience was below my expectations. Some aspects of the service need improvement.",
    "There were issues during the service that affected my overall experience.",
    "I expected a smoother and more professional experience. There is room for improvement.",
    "The service did not meet the standard I was expecting, particularly in terms of coordination.",
    "My experience was not satisfactory, and I hope the team can improve the service process.",
    "There were several aspects of the service that could have been handled more effectively.",
    "Unfortunately, my experience was not as expected. Better communication and follow-up would help.",
    "I was disappointed with the overall experience and believe there is significant scope for improvement."
  ],
  2: [
    "The service was partially satisfactory, but there were several areas that could be improved.",
    "The team completed the work, but the overall experience could have been more efficient.",
    "There were some positive aspects, but communication and coordination could have been better.",
    "The service was acceptable, although I experienced some issues during the process.",
    "The work was completed, but I expected better responsiveness and coordination.",
    "My experience was below expectations in some areas, particularly regarding communication.",
    "The service had some good points, but there is considerable room for improvement.",
    "The overall experience was average, with some delays or coordination issues.",
    "The team was able to complete the work, but the service could be more organized.",
    "The experience was not completely satisfactory, although some aspects of the service were helpful."
  ],
  3: [
    "The overall experience was satisfactory, although there are some areas that could be improved.",
    "The service was reasonably good, but communication and coordination could be more consistent.",
    "The work was completed satisfactorily, with some scope for improving the overall experience.",
    "A decent experience overall, although a few aspects of the service could be handled better.",
    "The service met my basic expectations, but there is room for improvement.",
    "The team was helpful, although the overall process could have been smoother.",
    "The work was satisfactory, but better communication would make the experience stronger.",
    "Overall, an average experience with some positive aspects and some areas needing improvement.",
    "The service was acceptable and the work was completed, but the process could be more efficient.",
    "A satisfactory experience overall. With a few improvements, the service could be considerably better."
  ],
  4: [
    "Very good experience with the team. The service was professional and the work was handled well.",
    "I had a positive experience with Sarate Surveyor. The team was responsive and professional.",
    "Good surveying service with professional coordination and satisfactory results.",
    "The team handled the surveying work efficiently and maintained good communication throughout.",
    "Overall, a very good experience. The service was reliable and professionally managed.",
    "I was satisfied with the quality of the surveying work and the team's approach.",
    "Professional service and good coordination. A few small improvements could make it even better.",
    "The experience was very positive, and the team demonstrated good technical understanding.",
    "Good service overall. The team was cooperative and completed the work professionally.",
    "A reliable and professional surveying experience. Overall, I was satisfied with the service."
  ],
  5: [
    "Excellent experience with Sarate Surveyor. The team was professional, accurate and responsive.",
    "Very professional surveying service. The team delivered the work with excellent attention to detail.",
    "Excellent service from start to finish. The team was knowledgeable, responsive and professional.",
    "Highly satisfied with the surveying work. The team handled the project efficiently and professionally.",
    "A great experience with a reliable and technically skilled surveying team.",
    "Excellent coordination and professional service. I was very satisfied with the overall experience.",
    "The team provided accurate and professional surveying services and maintained good communication throughout.",
    "Very impressed with the professionalism and quality of work. Excellent overall experience.",
    "Outstanding service and professional execution. The team was cooperative and efficient.",
    "Highly satisfied with the service. Professional team, good communication and quality surveying work."
  ]
};

interface FeedbackFormProps {
  rating: number;
  onFeedbackChange: (feedback: string) => void;
  currentFeedback: string;
}

export function FeedbackForm({ rating, onFeedbackChange, currentFeedback }: FeedbackFormProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (rating === 0) return;

    try {
      const sessionKey = "sarate_recent_feedback";
      let recentFeedback: Record<number, number[]> = {};
      const stored = sessionStorage.getItem(sessionKey);
      
      if (stored) {
        recentFeedback = JSON.parse(stored);
      }
      
      if (!recentFeedback[rating]) {
        recentFeedback[rating] = [];
      }

      const templates = feedbackTemplates[rating];
      let availableIndices = templates.map((_, i) => i).filter(i => !recentFeedback[rating].includes(i));
      
      if (availableIndices.length === 0) {
        // Reset pool if all have been used
        recentFeedback[rating] = [];
        availableIndices = templates.map((_, i) => i);
      }

      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const suggestion = templates[randomIndex];

      recentFeedback[rating].push(randomIndex);
      sessionStorage.setItem(sessionKey, JSON.stringify(recentFeedback));

      onFeedbackChange(suggestion);

      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "FEEDBACK_SUGGESTION_SHOWN",
          rating,
          metadata: { suggestionId: randomIndex + 1 } // 1-indexed to match requirements
        }),
      }).catch(console.error);
      
    } catch {
      const randomIndex = Math.floor(Math.random() * 10);
      onFeedbackChange(feedbackTemplates[rating]?.[randomIndex] || "");
    }
  }, [rating, onFeedbackChange]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFeedback);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Clipboard access denied. Please copy the text manually.");
    }
  };

  if (rating === 0) return null;

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <label htmlFor="feedback" className="block text-sm font-semibold text-gray-800 mb-1">
        Suggested feedback — You can edit this before submitting.
      </label>
      <p className="text-xs text-gray-500 mb-3">
        You can edit this suggestion, delete it, or write your own custom feedback.
      </p>
      
      <textarea
        id="feedback"
        rows={4}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
        value={currentFeedback}
        onChange={(e) => onFeedbackChange(e.target.value)}
        placeholder="Share details of your own experience at this place..."
      />
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Feedback copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Feedback</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
