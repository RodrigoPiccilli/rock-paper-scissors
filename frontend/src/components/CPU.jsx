import React, {useState} from 'react'

import rockLeft from "./images/rock-reverse.png"

import rockRight from "./images/rock.png"

// import paper from "./images/paper.png"

// import scissors from "./images/scissors.png"

import indicator from "./images/indicator.png"

const CPU = () => {

    const [animate, setAnimate] = useState(false);

    const [userMove, setUserMove] = useState('');

    const [cpuMove, setCPUMove] = useState('');

    const [userPoints, setUserPoints] = useState(0);

    const [cpuPoints, setCPUPoints] = useState(0);

    const handleStartRound = () => {

        setAnimate(true);

        fetch(`/cpu`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            setCPUMove(data.cpuMove);

            roundOutcome();

        }).catch(err => {
            console.log(err);
        })

        
        setTimeout( () => {
            setAnimate(false);
        }, 5000);


    }

    const roundOutcome = () => {

        if(userMove === "rock") {

            if(cpuMove === "rock") {
                return 0;
            }

            if(cpuMove === "paper") {
                return -1;
            }

            if(cpuMove === "scissors") {
                return 1;
            }

        } 

        if(userMove === "paper") {

            if(cpuMove === "rock") {
                return 1;
            }

            if(cpuMove === "paper") {
                return 0;
            }

            if(cpuMove === "scissors") {
                return -1;
            }

        }

        if(userMove === "scissors") {

            if(cpuMove === "rock") {
                return -1;
            }

            if(cpuMove === "paper") {
                return 1;
            }

            if(cpuMove === "scissors") {
                return 0;
            }

        }




    }
    
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
                    <img 
                        className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                        alt="User Move" src={rockLeft}/>
                    <h3>Points: </h3>
                </div>

                <div className="indicator collapse">
                    <img className="gameplay-icons" alt="Arrow" src={indicator}/>
                </div>

                <div className="cpu">
                    <img 
                        className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                        alt="CPU Move" src={rockRight}/>
                    <h3>Points: </h3>
                </div>

            </div>

            <div className="gameplay-actions">

                <button id="start" className="teko"
                onClick={() =>
                    handleStartRound()
                }
                
                >Start</button>
                <button id="restart" className="teko">Restart</button>

            </div>

       </div>

    )


}


export default CPU