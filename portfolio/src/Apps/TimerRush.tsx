import React, { useEffect, useState } from 'react'

interface TimerProps {
    onClose: () => void;
}

const TimerRush: React.FC<TimerProps> = ({onClose}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            onClose();
        }, 200)
    }

    useEffect(() => {
      setIsVisible(true);
    }, []);

    if (!isVisible && !isClosing) return null;

return (
  <div className="fixed inset-0 z-50 flex justify-center bg-black/20">
    <div
      className={`relative top-10
          from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-white/20
          w-[70vw] h-[80vh] overflow-hidden
          transform transition-all duration-300 ease-out 
          ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
        `}
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* macOS Window Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
          >
            <span className="text-red-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              ×
            </span>
          </button>
          <button
            /*  onClick={handleMinimize} */
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
          >
            <span className="text-yellow-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              −
            </span>
          </button>
          <button
            /*  onClick={handleMaximize} */
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
          >
            <span className="text-green-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              +
            </span>
          </button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm font-medium text-white">Timer Rush</h1>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Enhanced Main Content */}
      <div
        className="flex-1 h-full bg-gray-800 overflow-y-auto "
        style={{ scrollbarWidth: "thin" }}
      >
        <div
          className="w-full h-[90%] px-6 py-2 mb-10"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="w-full h-full bg-black/20 rounded-xl shadow-lg border border-gray-200 mb-10 overflow-hidden">
            <div className="w-full h-full relative">
              <iframe
                src="https://timer-rush.onrender.com/"
                width="100%"
                height="100%"
                title="Timer Rush"
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default TimerRush