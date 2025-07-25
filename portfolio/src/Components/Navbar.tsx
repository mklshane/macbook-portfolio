import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import apple from "../assets/apple.svg";
import battery from "../assets/battery.100.svg";
import switches from "../assets/switch.svg";
import magnify from "../assets/magnifyingglass.svg";
import wifi from "../assets/wifi.svg";

const Navbar = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full glass-morphism px-3 py-1 fixed">
      <div className="flex flex-row justify-between">
        {/* Left section */}
        <div className="flex gap-2 items-center">
          <img className="invert-color" src={apple} alt="" />
          <div className="flex gap-4">
            <a className="link font-bold" href="">
              Portfolio
            </a>
            <a className="link" href="">
              File
            </a>
            <a className="link" href="">
              Edit
            </a>
            <a className="link" href="">
              View
            </a>
            <a className="link" href="">
              Go
            </a>
            <a className="link" href="">
              Window
            </a>
            <a className="link" href="">
              Help
            </a>
          </div>
        </div>

        {/* Right section */}
        <div className="flex gap-2 items-center">
          <img className="invert-color" src={battery} alt="" />
          <img className="invert-color" src={switches} alt="" />
          <img className="invert-color" src={magnify} alt="" />
          <img className="invert-color" src={wifi} alt="" />
          <p className="link">{now.format("ddd MMM D")}</p>{" "}
          {/* e.g., Thu Jul 24 */}
          <p className="link">{now.format("h:mm A")}</p> {/* e.g., 9:41 AM */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
