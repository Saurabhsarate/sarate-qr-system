"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  stats: {
    scans: number;
    feedback: number;
    googleClicks: number;
    avgRating: string;
  };
  distribution: { name: string; count: number }[];
}

export function AnalyticsCards({ stats, distribution }: Props) {
  const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444']; // 5 to 1

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">QR Scans</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.scans}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Feedback</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.feedback}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Google Clicks</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.googleClicks}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Avg Rating</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.avgRating} ★</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Rating Distribution</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{fill: '#6b7280'}} />
              <YAxis allowDecimals={false} tick={{fill: '#6b7280'}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
