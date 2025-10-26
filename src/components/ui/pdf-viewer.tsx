"use client";

import React, { useState } from "react";
import { FileText, ExternalLink } from "lucide-react";

interface PDFViewerProps {
  url: string;
  fileName: string;
}

export function PDFViewer({ url, fileName }: PDFViewerProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 my-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-red-600" />
          <span className="font-medium text-gray-900">{fileName}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
        >
          <ExternalLink className="h-4 w-4" />새 창에서 열기
        </a>
      </div>

      <iframe
        src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
        className="w-full h-screen rounded border"
        title={`PDF Viewer: ${fileName}`}
      />
    </div>
  );
}
