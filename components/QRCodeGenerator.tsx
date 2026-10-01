"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Download, Printer } from "lucide-react";

interface QRCodeGeneratorProps {
  url: string;
}

export function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadSVG = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "sarate-surveyor-qr.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-sm mx-auto">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <QRCodeSVG
          value={url}
          size={200}
          level="H"
          includeMargin={true}
          ref={qrRef}
          className="print-qr-code"
        />
      </div>
      
      <p className="text-sm text-gray-500 mb-6 text-center">
        Destination: <span className="font-medium text-gray-800 break-all">{url}</span>
      </p>

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
