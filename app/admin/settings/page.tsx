"use client";

import { useState } from "react";
import { Save, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const [googleUrl, setGoogleUrl] = useState("https://g.page/r/CfL9_scZQe-IEAE/review");

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your application preferences and URLs.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Google Review URL</h3>
            <p className="mt-1 text-sm text-gray-500">
              This is the URL customers are redirected to when they leave a 4 or 5-star rating.
            </p>
            <div className="mt-4 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                URL
              </span>
              <input
                type="text"
                name="google-url"
                id="google-url"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={googleUrl}
                onChange={(e) => setGoogleUrl(e.target.value)}
                disabled
              />
            </div>
            <p className="mt-2 text-xs text-blue-600 font-medium flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1" />
              To change this URL, update the NEXT_PUBLIC_GOOGLE_REVIEW_URL in your .env file and restart the server.
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-medium text-gray-900">Admin Credentials</h3>
            <p className="mt-1 text-sm text-gray-500">
              The email and password for the admin dashboard.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
              Admin credentials (Email and Password) are securely managed via the <code>.env</code> file in your project directory. 
              <br /><br />
              <strong>Current Admin Email:</strong> <code>saurabhsarate357@gmail.com</code>
              <br />
              <strong>Current Password:</strong> <code>Saby152001</code>
            </div>
          </div>

        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            disabled
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 opacity-50 cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
