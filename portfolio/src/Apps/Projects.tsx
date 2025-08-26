import type React from "react";
import { useState, useEffect } from "react";
import weflash from "../assets/projects/weflash.png";
import dvd from "../assets/projects/dvd.png";
import timer from "../assets/projects/timer.png";

interface Project {
  id: number;
  title: string;
  category: string;
  type: string;
  duration: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

interface ProjectsProps {
  onClose: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects: Project[] = [
    {
      id: 1,
      title: "WeFlash",
      category: "WEB APPLICATION",
      type: "FULL STACK",
      duration: "3 months",
      description:
        "An efficient flashcard web application designed for efficient learning. Users can paste their notes or upload pdf files to convert to flashcards.",
      image: weflash,
      tech: [
        "React.js",
        "MongoDB",
        "Firebase",
        "Express",
        "NodeJS",
        "OpenAI API",
      ],
      demoUrl: "https://weflash-1.onrender.com/",
      sourceUrl: "https://github.com/mklshane/WeFlash",
    },
    {
      id: 2,
      title: "DVD Eliminator",
      category: "WEB GAME",
      type: "FRONTEND",
      duration: "2 weeks",
      description:
        "An interactive web-based game that challenges players to eliminate DVD logos bouncing around the screen. Features multiple difficulty levels, power-ups, and leaderboards with smooth animations.",
      image: dvd,
      tech: ["React.js"],
      demoUrl: "https://dvd-eliminator.vercel.app/",
      sourceUrl: "https://github.com/mklshane/dvd-eliminator",
    },
    {
      id: 3,
      title: "Timer Rush",
      category: "WEB GAME",
      type: "FULL STACK",
      duration: "1 week",
      description:
        "An interactive web-based game that challenges players to stop the timer at the exact target time given to them. At the 5-second mark the timer will close, pushing the intuition of the player to work..",
      image: timer,
      tech: [
        "React.js",
        "Typescript",
        "MongoDB",
        "NodeJS",
        "Express",
        "Tailwind",
      ],
      demoUrl: "#",
      sourceUrl: "https://github.com/mklshane/timer-rush",
    },
  ];

  useEffect(() => {
    // Set the first project as default
    setSelectedProject(allProjects[0]);
    // Trigger opening animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleMinimize = () => {
    console.log("Minimize clicked");
  };

  const handleMaximize = () => {
    console.log("Maximize clicked");
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  if (!isVisible && !isClosing) return null;

  const otherProjects = allProjects.filter((p) => p.id !== selectedProject?.id);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/20">
      <div
        className={`relative top-10
          bg-black rounded-xl shadow-2xl border border-white/20
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
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-yellow-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                −
              </span>
            </button>
            <button
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-green-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </span>
            </button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-sm font-medium text-white">Projects</h1>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Content with Background */}
        <div
          className="h-full bg-black overflow-y-auto relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600/30 hover:scrollbar-thumb-gray-500/50"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/placeholder.svg?height=1080&width=1920')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            scrollbarWidth: "thin",
          }}
        >
          <style>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: rgba(75, 85, 99, 0.3);
              border-radius: 2px;
            }
            .scrollbar-thin:hover::-webkit-scrollbar-thumb {
              background-color: rgba(107, 114, 128, 0.5);
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background-color: rgba(107, 114, 128, 0.7);
            }
          `}</style>

          <div className="p-8">
            {/* Main Project Info */}
            {selectedProject && (
              <div className="mb-8">
                {/* Project Hero Image */}
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 font-semibold text-xs">
                        {selectedProject.category}
                      </span>
                      <span className="text-white text-xs">|</span>
                      <span className="text-white text-xs">
                        {selectedProject.type}
                      </span>
                      <span className="text-white text-xs">|</span>
                      <span className="text-white text-xs">
                        {selectedProject.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-md leading-relaxed mb-6 max-w-3xl">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800/80 text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 h-10 mb-8">
                  <button className="bg-white text-black text-sm px-6 py-4 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <span>▶</span>
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Demo
                    </a>
                  </button>
                  <button className="bg-red-800 text-white text-sm px-8 py-3 rounded font-semibold hover:bg-red-900 transition-colors flex items-center">
                    <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Source Code
                    </a>
                  </button>
                  
                </div>
              </div>
            )}

            {/* More Like This Section */}
            <div>
              <h2 className="text-white text-2xl font-bold mb-6">
                More Projects
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {otherProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleProjectSelect(project)}
                  >
                    {/* Project Image/Card */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <span className="text-xl">▶</span>
                        </button>
                      </div>
                    </div>
                    {/* Project Info */}
                    <div className="space-y-2 mb-8">
                      <h3 className="text-white font-semibold text-sm group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded">
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
