import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from "./components/Menu.jsx"
import CPU from "./components/CPU.jsx"

import './App.css';

const AppContent = () => {

    // 1 Player
    // 2 Player

    return (

        <Routes> 
            <Route path='/' element= {<Menu/> }> </Route>
            <Route path='/vsCPU' element= {<CPU/> }> </Route>
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
