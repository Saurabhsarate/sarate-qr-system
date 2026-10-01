"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Download, Printer } from "lucide-react";

/**
 * Props for the QRCodeGenerator component
 * @property url - The destination URL the QR code should point to
 */
interface QRCodeGeneratorProps {
  url: string;
}

/**
 * A component that renders a QR Code and provides functionality to download it as an SVG or print it.
 * Designed for creating physical marketing materials for the Surveyor system.
 */
export function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  // Reference to the SVG element to allow extracting its XML data for download
  const qrRef = useRef<SVGSVGElement>(null);

  /**
   * Serializes the QR code SVG element into a blob and triggers a browser download.
   * This ensures the QR code downloads as a high-quality vector graphic.
   */
  const downloadSVG = () => {
    if (!qrRef.current) return; // Ensure the element exists before proceeding
    
    // Convert the SVG DOM element to a raw XML string
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    
    // Create a Blob from the SVG string
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "sarate-surveyor-qr.svg"; // Default filename
    
    // Programmatically click the link to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  /**
   * Triggers the browser's native print dialog.
   * Relies on CSS media queries (e.g., @media print) to format the output.
   */
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-sm mx-auto">
      {/* QR Code Container */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <QRCodeSVG
          value={url}
          size={200}
          level="H" // High error correction level (best for printing/damage resistance)
          includeMargin={true} // Adds the required quiet zone around the QR code
          ref={qrRef}
          className="print-qr-code"
        />
      </div>
      
      {/* Display the actual destination URL for verification */}
      <p className="text-sm text-gray-500 mb-6 text-center">
        Destination: <span className="font-medium text-gray-800 break-all">{url}</span>
      </p>

      {/* Action Buttons: Download and Print */}
      <div className="flex space-x-3 w-full">
        <button
          onClick={downloadSVG}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 py-2.5 px-4 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">SVG</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Printer className="w-4 h-4" />
          <span className="text-sm font-medium">Print</span>
        </button>
      </div>
    </div>
  );
}
