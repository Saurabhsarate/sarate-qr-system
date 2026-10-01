import Link from "next/link";
import { LayoutDashboard, MessageSquare, QrCode, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/feedback" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
            <MessageSquare className="w-5 h-5 mr-3" />
            Feedback
          </Link>
          <Link href="/admin/qr" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
            <QrCode className="w-5 h-5 mr-3" />
            QR Generator
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link href="/api/auth/signout" className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 md:hidden">
          <span className="text-lg font-bold text-gray-900">Sarate Surveyor Admin</span>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
