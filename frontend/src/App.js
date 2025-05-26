import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from "./components/Menu.jsx"
import CPU from "./components/CPU.jsx"
import Multiplayer from "./components/Multiplayer.jsx"

import './App.css';

const AppContent = () => {

    return (

        <Routes> 
            <Route path='/' element= {<Menu/> }> </Route>
            <Route path='/vsCPU' element= {<CPU/> }> </Route>
            <Route path='/multiplayer' element= {<Multiplayer/> }> </Route>
        </Routes>

    )

}

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    </div>
  );
}

export default App;
