import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10 border border-gray-100">
        
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Thank you for taking the time to visit our Google Review page and sharing your experience with Sarate Surveyor.
        </p>

        <div className="pt-6 border-t border-gray-100">
          <Link 
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
