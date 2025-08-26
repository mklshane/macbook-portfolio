import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const playlist = [
  {
    title: "Good Days",
    artist: "SZA",
    src: "/songs/good-days.mp3",
    cover: "/albums/snooze.jpg",
  },
  {
    title: "Lucid Dream",
    artist: "aespa",
    src: "/songs/lucid-dream.mp3",
    cover: "/albums/savage.jpg",
  },
  {
    title: "Iris",
    artist: "Goo Goo Dolls",
    src: "/songs/iris.mp3",
    cover: "/albums/iris.jpg",
  },
  {
    title: "Whiplash",
    artist: "aespa",
    src: "/songs/whiplash.mp3",
    cover: "/albums/whiplash.jpg",
  },
  {
    title: "Maroon",
    artist: "Taylor Swift",
    src: "/songs/maroon.mp3",
    cover: "/albums/midnights.jpg",
  },
  {
    title: "Multo",
    artist: "Cup of Joe",
    src: "/songs/multo.mp3",
    cover: "/albums/multo.jpg",
  },
  {
    title: "Back to Friends",
    artist: "sombr",
    src: "/songs/btf.mp3",
    cover: "/albums/btf.jpg",
  },
];

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = playlist[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      if (isPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }

      const updateProgress = (): void => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration);
        }
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleNextTrack);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleNextTrack);
      };
    }
  }, [isPlaying, currentTrack, volume]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = (): void => setIsPlaying(!isPlaying);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const newTime = (parseFloat(e.target.value) / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleNextTrack = (): void => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevTrack = (): void => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="widget-medium h-[130px] p-0 bg-black/5 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden flex">
      {/* Album Art */}
      <div className="w-[120px] h-full flex-shrink-0">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        {/* Song Info */}
        <div>
          <h2 className="text-sm font-semibold text-white truncate">
            {song.title}
          </h2>
          <p className="text-xs text-white text-shadow truncate">
            {song.artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevTrack}
              className="bg-white/20 p-1.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              <SkipBack className="w-3 h-3 text-whitefill-current" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-1.5 bg-white/20 hover:bg-gray-800 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 text-white fill-current" />
              ) : (
                <Play className="w-3 h-3 text-white fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNextTrack}
              className="bg-white/20 p-1.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              <SkipForward className="w-3 h-3 text-white fill-current" />
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="">
          <div className="relative mb-1">
            <input
              type="range"
              value={progress}
              onChange={handleProgress}
              className="w-full h-0.5 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #000 0%, #000 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white text-shadow-2xl">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(duration - currentTime)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={song.src} />

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 1px solid #fff;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fc816b;
          cursor: pointer;
          border: 1px solid #fff;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
