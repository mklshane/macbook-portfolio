import React from "react";

const Notes = () => {
  return (
    <div className="widget-large w-[320px] h-[320px] rounded-2xl bg-[#fffbea] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-black p-4 flex flex-col gap-3 widget-hover border border-yellow-200">
      {/* Header */}
      <div className="text-sm font-semibold text-gray-700 border-b border-yellow-300 pb-1 tracking-wide">
        Notes
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto text-sm leading-relaxed space-y-2 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent">
        <p>
          Hi, I’m{" "}
          <span className="font-semibold italic text-[#bc305a]">
            Mikaela Shane Estrellanes
          </span>
          , a 3rd Year <span className="font-medium">BS Computer Science</span>{" "}
          student at <span className="font-medium">De La Salle Lipa</span>.
        </p>
        <p>
          I’m passionate about{" "}
          <span className="italic">software engineering, UI design</span>, and{" "}
          <span className="italic">human-centered technology</span>.
        </p>
        <p>
          I’m currently building apps using the{" "}
          <span className="font-medium">MERN stack</span> and exploring AI tools
          for education.
        </p>
        <p>
          I love organizing tech workshops and building website.
        </p>
      </div>
    </div>
  );
};

export default Notes;
