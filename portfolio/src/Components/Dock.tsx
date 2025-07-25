import React from "react";
import face from '../assets/apps/face.png'
import chrome from "../assets/apps/chrome.png";
import safari from "../assets/apps/safari.png";
import mess from "../assets/apps/imess.png";
import maps from "../assets/apps/maps.png";
import contact from "../assets/apps/contact.png";
import mail from "../assets/apps/mail.png";
import purple from "../assets/apps/purpleapp.png";

import todo from "../assets/apps/todo.png";
import notes from "../assets/apps/notes.png";

import settings from "../assets/apps/settings.png";
import trash from "../assets/apps/trash.png";

type Image = {
    image: string;
}

const apps: Image[] = [
  {
    image: face,
  },
  {
    image: chrome,
  },
  {
    image: safari,
  },
  {
    image: mess,
  },
  {
    image: maps,
  },
  {
    image: contact,
  },
  {
    image: mail,
  },
  {
    image: purple,
  },
];

const apps2: Image[] = [
    {
        image: todo
    },
    {
        image: notes
    }
];

const apps3: Image[] = [
    {
        image: settings
    },
    {
        image: trash
    }
];


const Dock = () => {
  return (
    <div className="w-[55%] h-14 glass-morphism rounded-2xl shadow-2xl fixed bottom-2.5 left-1/2 -translate-x-1/2 flex justify-center items-center">
      {apps.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
        />
      ))}
      <div className="w-px h-[80%] bg-black/8 mx-2"></div>
      {apps2.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
        />
      ))}
      <div className="w-px h-[80%] bg-black/8 mx-2"></div>
      {apps3.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
        />
      ))}
    </div>
  );
};

export default Dock;
