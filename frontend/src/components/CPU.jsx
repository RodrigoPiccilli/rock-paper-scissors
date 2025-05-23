import React, {useState} from 'react'

import rockLeft from "./images/rock-reverse.png"

import rockRight from "./images/rock.png"

import paper from "./images/paper.png"

import scissors from "./images/scissors.png"

import indicator from "./images/indicator.png"

const CPU = () => {
    
    return (

       <div id="game-container">

            <header>
                <h1>Rock, Paper, Scissors!</h1>
            </header>

            <div id="game-type">
                <h1>First to 5</h1>
            </div>

            <div id="gameplay">

                <div className="player">
                    <h3>Points: </h3>
                    <img className="gameplay-icons" alt="User Move" src={rockLeft}/>
                </div>

                <div className="indicator collapse">
                    <img className="gameplay-icons" alt="Arrow" src={indicator}/>
                </div>

                <div className="cpu">
                    <h3>Points: </h3>
                    <img className="gameplay-icons" alt="CPU Move" src={rockRight}/>
                </div>

            </div>

            <div className="gameplay-actions">

                <button id="start" className="teko">Start</button>
                <button id="restart" className="teko">Restart</button>

            </div>

            




       </div>

    )


}


export default CPU