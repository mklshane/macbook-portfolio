const Notes = () => {
  return (
    <div className="w-[320px] h-[320px] rounded-2xl bg-white shadow-lg text-black flex flex-col overflow-hidden border border-[#fbbf24]/20">
      {/* Header */}
      <div className="bg-[#fbbf24]/30 px-4 py-3 border-b border-[#fbbf24]/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
          <span className="text-sm font-medium text-[#92400e] tracking-wide">
            Notes
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3 text-sm leading-relaxed text-[#451a03]">
          <p>
            Hi, I'm{" "}
            <span className="font-semibold">
              Mikaela Shane Estrellanes
            </span>
            , a 3rd Year{" "}
            <span className="font-medium">BS Computer Science</span> student at{" "}
            <span className="font-medium">De La Salle Lipa</span>.
          </p>
          <p>
            I'm passionate about{" "}
            <span className="italic text-[#92400e]">
              software engineering, UI design
            </span>
            , and{" "}
            <span className="italic text-[#92400e]">
              human-centered technology
            </span>
            .
          </p>
          <p>
            I'm currently building apps using the{" "}
            <span className="font-medium text-[#92400e]">MERN stack</span> and
            exploring AI tools for education.
          </p>
          <p>I love organizing tech workshops and building websites.</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
