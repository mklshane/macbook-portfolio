import React from "react";
import bg2 from "../assets/bg2.jpg";
import gradient from "../assets/gradient-wp.jpg";
import Clock from "./Widgets/Clock";
import mypic from '../assets/me.jpg'
import Notes from "./Widgets/Notes";
import MusicPlayer from "./Widgets/MusicPlay";
import projectIcon from "../assets/apps/this_computer.png"
import contact from "../assets/apps/phone.png";
import skills from "../assets/apps/minecraft.png";
import resume from "../assets/apps/text_file_2.png";


const Desktop = () => {
  return (
    <div
      className="w-full h-dvh bg-cover bg-center"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="relative flex pt-13 gap-4 px-6">
        <Clock />
        <div
          className="widget-medium widget-hover rounded-2xl border border-white/20 shadow-md backdrop-blur-md"
          style={{
            backgroundImage: `url(${mypic})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="p-6 flex justify-start gap-4">
        <Notes />
        <div className="flex flex-col gap-5">
          <MusicPlayer />
          <div className="mx-4 grid grid-cols-3 gap-5">
            <button className=" flex flex-col items-center">
              <img src={projectIcon} className="app-hover w-[48px]" alt="" />
              <div
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.05), rgba(0,0,0,0))",
                }}
              >
                <p className="link mt-1 text-[11px] text-white font-medium text-shadow-2xl">
                  Projects
                </p>
              </div>
            </button>
            <button className="flex flex-col items-center">
              <img src={skills} className={"app-hover w-[48px]"} alt="" />
              <div
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.05), rgba(0,0,0,0))",
                }}
              >
                <p className="link mt-1 text-[11px] text-white font-medium text-shadow-2xl">
                  Skills
                </p>
              </div>
            </button>
            <button className="flex flex-col items-center">
              <img src={resume} className={"app-hover w-[48px]"} alt="" />
              <div
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.05), rgba(0,0,0,0))",
                }}
              >
                <p className="link mt-1 text-[11px] text-white font-medium text-shadow-2xl">
                  Resume
                </p>
              </div>
            </button>
            <button className="flex flex-col items-center">
              <img src={contact} className={"app-hover w-[48px]"} alt="" />
              <div
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.05), rgba(0,0,0,0))",
                }}
              >
                <p className="link mt-1 text-[11px] text-white font-medium text-shadow-2xl">
                  Contact Me
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
