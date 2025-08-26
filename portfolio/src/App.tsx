import { useState } from 'react'
import Navbar from './Components/Navbar.tsx'
import './index.css';
import Desktop from './Components/Desktop.tsx';
import Dock from './Components/Dock.tsx';


function App() {
  const [openedApps, setOpenedApps] = useState<string[]>([]);

  const openApp = (appName: string) => {
    if (!openedApps.includes(appName)) {
      setOpenedApps([...openedApps, appName]);
    }
  };

  const closeApp = (appName: string) => {
    setOpenedApps(openedApps.filter((app) => app !== appName));
  };


  return (
    <div>

     <Navbar />
     <Desktop openedApps={openedApps} closeApp={closeApp}/>

    <Dock onAppClick={openApp} />
    
    </div>
    
  )
}

export default App
