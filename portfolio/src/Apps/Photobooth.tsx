import { useEffect, useRef, useState } from "react";

const PhotoBooth = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number>(-1);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if ((e.target as HTMLElement).closest(".bottom-controls")) return;

    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: Math.max(0, e.clientX - dragOffset.x),
      y: Math.max(0, e.clientY - dragOffset.y),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const capturePhoto = async () => {
    if (!videoRef.current || isCapturing) return;

    setIsCapturing(true);

    const shutter = document.getElementById("shutter-effect");
    if (shutter) {
      shutter.classList.add("opacity-100");
      setTimeout(() => shutter.classList.remove("opacity-100"), 150);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setCapturedPhotos((prev) => [dataUrl, ...prev]);
    setSelectedPhoto(0);
    setIsCapturing(false);
  };

  const downloadPhoto = (photoUrl: string) => {
    const a = document.createElement("a");
    a.href = photoUrl;
    a.download = `photo-${new Date().getTime()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
    if (selectedPhoto === index) {
      setSelectedPhoto(-1);
    } else if (selectedPhoto > index) {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed w-[550px] h-[380px] bg-black/60 rounded-xl shadow-2xl z-50 overflow-hidden select-none"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {/*  Title Bar  */}
      <div
        className="flex justify-between items-center px-4 py-1 bg-black/40 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer shadow-sm"
            onClick={onClose}
          />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 hover:bg-green-600 shadow-sm" />
        </div>
        <span className="text-[13px] font-medium text-white">Photo Booth</span>
        <div className="w-16" />
      </div>

      {/* Main Video Area */}
      <div className="relative bg-black h-[calc(100%-75px)]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />

        {/* Shutter Effect */}
        <div
          id="shutter-effect"
          className="absolute inset-0 bg-white opacity-0 transition-opacity duration-150 pointer-events-none"
        />

        {/* Selected Photo Overlay */}
        {selectedPhoto >= 0 && capturedPhotos[selectedPhoto] && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <img
              src={capturedPhotos[selectedPhoto]}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(-1)}
              className="absolute top-3 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <span className="text-white text-lg font-bold">×</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls*/}
      <div className="bottom-controls absolute bottom-0 left-0 right-0 h-[48px] bg-black/50 flex items-center justify-center px-6">
        {/* Center - Camera Button */}
        <button
          onClick={capturePhoto}
          disabled={isCapturing}
          className={`w-9 h-9 rounded-full  transition-all duration-200 ${
            isCapturing
              ? "bg-gray-400 scale-95"
              : "bg-[#bf1813] hover:bg-red-600 active:scale-95 shadow-lg"
          }`}
        >
          <div className="flex items-center justify-center">
            <svg
              className="w-5.5 h-5.5 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
        </button>
      </div>

      {/* Gallery Strip (when photos exist) */}
      {capturedPhotos.length > 0 && selectedPhoto === -1 && (
        <div className="absolute bottom-12 flex gap-[0.5px]">
          {capturedPhotos.slice(0, 7).map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className="w-20 h-12 rounded-xs overflow-hidden hover:scale-105 transition-transform border-[1.5px] border-white/80 hover:border-white"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Action buttons for selected photo */}
      {selectedPhoto >= 0 && (
        <div className="absolute bottom-3.5 right-4 flex items-center space-x-2">
          <button
            onClick={() => downloadPhoto(capturedPhotos[selectedPhoto])}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30 font-medium hover:scale-105 active:scale-95"
          >
            <div className="flex items-center space-x-1.5">
            
              <span>Share</span>
            </div>
          </button>
          <button
            onClick={() => deletePhoto(selectedPhoto)}
            className="px-4 py-1 bg-white/10 hover:bg-red-500/80 backdrop-blur-md text-white text-xs rounded-lg transition-all duration-200 border border-white/20 hover:border-red-400/50 font-medium hover:scale-105 active:scale-95"
          >
            <div className="flex items-center space-x-1.5">
              
              <span>Delete</span>
            </div>
          </button>
        </div>
      )}

     
    </div>
  );
};

export default PhotoBooth;
