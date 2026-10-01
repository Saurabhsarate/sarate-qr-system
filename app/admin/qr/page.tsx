import { QRCodeGenerator } from "@/components/QRCodeGenerator";

export default function QRManagementPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reviews.saratesurveyor.site";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">QR Code Management</h1>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Display QR Code</h2>
        <p className="text-sm text-gray-500 mb-8">
          Download or print this QR code for your visiting cards, reports, and office displays.
        </p>

        <QRCodeGenerator url={appUrl} />
        
        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-6 border-gray-100">
          <p>Scan to share your experience.</p>
        </div>
      </div>
    </div>
  );
}
