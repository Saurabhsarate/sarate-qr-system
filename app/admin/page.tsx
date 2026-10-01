import { prisma } from "@/lib/db";
import { AnalyticsCards } from "@/components/AnalyticsCards";

export default async function AdminDashboard() {
  const [totalScans, totalFeedback, totalClicks, allFeedback] = await Promise.all([
    prisma.reviewEvent.count({ where: { eventType: "QR_SCAN" } }),
    prisma.reviewEvent.count({ where: { eventType: "RATING_SELECTED" } }),
    prisma.reviewEvent.count({ where: { eventType: "GOOGLE_REVIEW_CLICKED" } }),
    prisma.reviewEvent.findMany({ 
      where: { eventType: "RATING_SELECTED" },
      select: { rating: true } 
    }),
  ]);

  const totalStars = allFeedback.reduce((sum, item) => sum + (item.rating || 0), 0);
  const avgRating = allFeedback.length > 0 ? (totalStars / allFeedback.length).toFixed(1) : "0.0";

  const distMap = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allFeedback.forEach((f) => {
    if (f.rating && f.rating >= 1 && f.rating <= 5) {
      distMap[f.rating as keyof typeof distMap]++;
    }
  });

  const distribution = [
    { name: "5 Star", count: distMap[5] },
    { name: "4 Star", count: distMap[4] },
    { name: "3 Star", count: distMap[3] },
    { name: "2 Star", count: distMap[2] },
    { name: "1 Star", count: distMap[1] },
  ];

  const stats = {
    scans: totalScans,
    feedback: totalFeedback,
    googleClicks: totalClicks,
    avgRating,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Overview Dashboard</h1>
      <AnalyticsCards stats={stats} distribution={distribution} />
    </div>
  );
}
