import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const Clock = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget-medium widget-hover text-[#f78aaa] bg-white/80 p-8 flex flex-col justify-center gap-2">
      <h1 className="text-5xl font-[500]">{now.format("hh:mm A")}</h1>
      <p className="text-md text-black/80">{now.format("dddd, MMMM D")}<span className="font-bold">, Philippines</span></p>
    </div>
  );
};

export default Clock;
