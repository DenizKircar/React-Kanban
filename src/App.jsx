
import ListDisplay from "./components/ListDisplay.jsx";
import Sidebar from "./components/SideBar.jsx";
import Fallback from './components/Fallback.jsx';
import { useState } from "react"

function App() {
  const [ xPosn, setXPosn ] = useState('calc(10px - 20vw)');
  const [ activeBoard, setActiveBoard ] = useState(null);
  

  return (
    <>
      <Sidebar
        setActiveBoard={setActiveBoard}
        activeBoard={activeBoard}
        xPosn={xPosn}
        setXPosn={setXPosn}
      />
      {activeBoard !== null ?
        <ListDisplay key={activeBoard} idNum={activeBoard} xPosn={xPosn}/>
        :
        <Fallback xPosn={xPosn} />
      }
    </>
  )
}

export default App



// Dreaming big at Hack the North for me would involve pushing the boundaries of my current knowledge to create something truly innovative and impactful in the direction of my passions while also contributing to my self growth. To push through limits of my skill, sleep, and sanity to work for something with the potential to transform my daily life alongside my passions.


// Two of the things that I have always been the most fond of in terms of technology were drag and drop organization apps (i.e. trello, notion); and things that look pretty, that animate nicely.

// However, over time I grew to think about certain features and how could they be made better or made look prettier. Whether it be about the UI, animations, or certain features; I began to long to build my own organization web app. Coming to university with zero programming knowledge, I spent my first year taking online courses outside to learn about web development, explored libraries such as React; alongside certain animation tools that compliment the javascript libraries I had learnt.

// Throughout this time, I have been developing my own web app with my own vision and also crafting it with animations the more I learn about the tools I use, which has definitely been proving a challenging but rewarding experience as my background and passion in 2D animation compliments this process and powers me through the challenge. 

// I have put a whole year of hard work into this project and I am looking forwards to the time I will spend on it, challenges I will face, and knowledge I will gain.


// do the fucking fallback and push this to git


// One thing I find absolutely hilarios is mispronouncing things on purpos. Whenever I catch my frens misspeak or mispronounce something, tis alwys a good lauf. Among thos wors though, my favorito has to be calling my cat a "car". Initili it was an internet joke I saw about cars being silly, btu I grew to find the naming absolutely hilaros and started making all types of wordplay about my car. "My car runs on diesel she doesn't eat dry food", "my car broke down she is not running", "drifting car", are some I name the mos. I think I might just have to be a car person, I lvoe my car. I hope everyone may come upon the joy of embracing a car once, but definitely not limited to, in thir lifetim.