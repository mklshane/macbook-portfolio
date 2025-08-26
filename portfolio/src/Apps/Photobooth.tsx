import { useEffect, useRef } from "react";

const PhotoBooth = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startCamera();

    return () => {
      // Stop the webcam when the component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="absolute top-10 left-10 w-[450px] h-[350px] bg-black/50 border border-white/20 rounded-xl shadow-xl backdrop-blur-md z-50 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-black/30 text-white text-sm font-semibold">
        <span>Photo Booth</span>
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          ×
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-b-xl"
        />
      </div>
    </div>
  );
};

export default PhotoBooth;
