import "./menu.css"

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const navigate = useNavigate();

    const handleStart = (mode) => {

        if(mode === 1) {
            navigate("/vsCPU");
        } else {
            navigate("/multiplayer")
        }


    }

    return (

        <div className="menu-frame">

            <div className="menu-container">

                
                    <h1 className="titan">Rock, Paper, Scissors!</h1>
                    <div className="player-options">
                        <button 
                            className="teko player-button player1" onClick={() => handleStart(1)}>1 PLAYER</button>
                        <button className="teko player-button player2" onClick={() => handleStart(2)}>2 PLAYER</button>
                    </div>

                 </div>

        </div>





    )


}

export default Menu