import { useState } from 'react'
import Navbar from './Components/Navbar.tsx'
import './index.css';
import Desktop from './Components/Desktop.tsx';
import Dock from './Components/Dock.tsx';


function App() {


  return (
    <div>

     <Navbar />
     <Desktop />

    <Dock />
    
    </div>
    
  )
}

export default App
