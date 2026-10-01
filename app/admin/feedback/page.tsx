import { prisma } from "@/lib/db";

export default async function AdminFeedbackPage() {
  const feedbacks = await prisma.reviewEvent.findMany({
    where: { 
      eventType: "RATING_SELECTED"
    },
    orderBy: { createdAt: 'desc' },
    take: 100, // Just limiting to last 100 for display
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Recent Customer Feedback</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-100 uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Rating</th>
                <th className="px-6 py-4 w-1/2">Feedback Text</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No feedback recorded yet.
                  </td>
                </tr>
              ) : (
                feedbacks.map((f: any) => {
                  let text = "N/A";
                  if (f.metadata && typeof f.metadata === 'string') {
                    try {
                       const parsed = JSON.parse(f.metadata);
                       if (parsed.feedback) text = parsed.feedback;
                    } catch {
                      // ignore parse errors
                    }
                  }
                  
                  return (
                    <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {new Date(f.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-900">
                        {f.rating} ★
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {text}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
