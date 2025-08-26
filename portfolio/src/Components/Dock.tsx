import face from '../assets/apps/face.png'
import chrome from "../assets/apps/chrome.png";
import safari from "../assets/apps/safari.png";
import mess from "../assets/apps/imess.png";
import maps from "../assets/apps/maps.png";
import contact from "../assets/apps/contact.png";
import mail from "../assets/apps/mail.png";
import todo from "../assets/apps/todo.png";
import notes from "../assets/apps/notes.png";
import settings from "../assets/apps/settings.png";
import trash from "../assets/apps/trash.png";
import photobooth from "../assets/apps/photobooth.png";

type Image = {
    name: string,
    image: string,
}

const apps: Image[] = [
  {
    name: "Face",
    image: face,
  },
  {
    name: "Chrome",
    image: chrome,
  },
  {
    name: "Safari",
    image: safari,
  },
  {
    name: "Messages",
    image: mess,
  },
  {
    name: "Maps",
    image: maps,
  },
  {
    name: "Contact",
    image: contact,
  },
  {
    name: "Mail",
    image: mail,
  },
  {
    name: "Photobooth",
    image: photobooth,
  },
];

const apps2: Image[] = [
  {
    name: "ToDo",
    image: todo,
  },
  {
    name: "Notes",
    image: notes,
  },
];

const apps3: Image[] = [
  {
    name: "Settings",
    image: settings,
  },
  {
    name: "Trash",
    image: trash,
  },
];

type DockProps = {
  onAppClick: (appName: string) => void;
};


const Dock = ({ onAppClick }: DockProps) => {
  return (
    <div className="w-[55%] h-14 glass-morphism rounded-2xl shadow-2xl fixed bottom-2.5 left-1/2 -translate-x-1/2 flex justify-center items-center">
      {apps.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
          onClick={() => onAppClick(app.name)}
        />
      ))}
      <div className="w-px h-[80%] bg-black/8 mx-2"></div>
      {apps2.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
          onClick={() => onAppClick(app.name)}
        />
      ))}
      <div className="w-px h-[80%] bg-black/8 mx-2"></div>
      {apps3.map((app) => (
        <img
          src={app.image}
          className="mx-1 app-hover"
          style={{ width: "50px", height: "50px" }}
          onClick={() => onAppClick(app.name)}
        />
      ))}
    </div>
  );
};

export default Dock;
