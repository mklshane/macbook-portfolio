import React, { useEffect, useState } from "react";
import { Download, X, Minimize2, Maximize2, ExternalLink } from "lucide-react";

interface ResumeProps {
  onClose: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    // Auto-hide loading after a reasonable time
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Estrellanes-Resume.pdf";
    link.download = "Estrellanes-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMaximize = () => {
    setIsMaximized(true);
  };

  const handleMinimize = () => {
     setIsMaximized(false);
  }

  if (!isVisible && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40  ">
      <div
        className={`relative top-10 bg-white rounded-2xl shadow-2xl border border-gray-200/50
          overflow-y-auto transform transition-all duration-300 ease-out 
          ${
            isClosing
              ? "scale-95 opacity-0 translate-y-4"
              : "scale-100 opacity-100 translate-y-0"
          }
          ${isMaximized ? "w-[95vw] h-[95vh]" : "w-[70vw] h-[80vh]"}
        `}
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          scrollbarWidth: "thin",
        }}
      >
        {/* Enhanced Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClose}
              className="w-3.5 h-3.5 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 flex items-center justify-center group shadow-sm"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              className="w-3.5 h-3.5 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all duration-200 flex items-center justify-center group shadow-sm"
              onClick={handleMinimize}
            >
              <Minimize2 className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-3.5 h-3.5 bg-green-500 rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center group shadow-sm"
            >
              <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-md font-semibold text-gray-800">Resume</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button
              onClick={() => window.open("/Estrellanes-Resume.pdf", "_blank")}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Open</span>
            </button>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div
          className="flex-1 h-full bg-gray-50"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="w-full h-full p-6">
            <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div
                className="w-full h-full relative"
                
              >
                <iframe
                  src="/Estrellanes-Resume.pdf"
                  width="100%"
                  height="100%"
                  title="Resume PDF Viewer"
                  className="w-full h-full"
                  style={{ border: "none" }}
                  onLoad={() => setIsLoading(false)}
                />

                {/* Loading overlay - only show when loading */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">
                        Loading Resume...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-3 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>PDF Ready</span>
              </span>
              <span>Estrellanes-Resume.pdf</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>100% zoom</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                ESC to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
