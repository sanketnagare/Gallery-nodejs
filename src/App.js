import React from 'react'
// import Images from './components/Images'
// import Videos from './components/Videos';
import { BrowserRouter} from "react-router-dom";
import Navbar from './components/Navbar';
// import VideoDetails from './components/VideoDetails';
// import Videos from './components/Videos';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  )
}

export default App