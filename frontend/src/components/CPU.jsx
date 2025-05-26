import React, {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

import rockLeft from "./images/rock-reverse.png"
import paperLeft from "./images/paper.png"
import scissorsLeft from "./images/scissors.png"


import rockRight from "./images/rock.png"
import paperRight from "./images/paper-reverse.png"
import scissorsRight from "./images/scissors-reverse.png"

import indicatorLeft from "./images/indicatorLeft.png"
import indicatorRight from "./images/indicatorRight.png"


const CPU = () => {

    const [animate, setAnimate] = useState(false);

    const [userMove, setUserMove] = useState('rock');

    const [cpuMove, setCPUMove] = useState('');

    const [userPoints, setUserPoints] = useState(0);

    const [cpuPoints, setCPUPoints] = useState(0);

    const [ongoingRound, setOngoing] = useState(false);

    const [outcome, setOutcome] = useState(0);

    const [score, setScore] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {

        const handleKeyDown = (event) => {

            const allowedKeys = ['a', 's', 'd'];

            if(event.key === allowedKeys[0]) {
                setUserMove("rock");
            }

            if(event.key === allowedKeys[1]) {
                setUserMove("paper");
            }

            if(event.key === allowedKeys[2]) {
                setUserMove("scissors");
            }

            return;

        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }



    }, [])

    const handleStartRound = () => {

        setAnimate(true);
        setOutcome(0);

        fetch(`/cpu`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            console.log(userMove);

            setCPUMove(data.cpuMove);

            setTimeout( () => {

                roundOutcome(data.cpuMove);

            }, 4000)

        }).catch(err => {
            console.log(err);
        })
        
        setTimeout( () => {
            setAnimate(false);
            setOngoing(true);
        }, 4000);

        setOngoing(false);



    }

    const roundOutcome = (cpuMove) => {

        if(userMove === "rock") {

            if(cpuMove === "rock") {
                setOutcome(0);
            }

            if(cpuMove === "paper") {
                setCPUPoints((pts) => pts + 1);
                setOutcome(-1);
            }

            if(cpuMove === "scissors") {
                setUserPoints((pts) => pts + 1);
                setOutcome(1);
            }

        } 

        if(userMove === "paper") {

            if(cpuMove === "rock") {
                setUserPoints((pts) => pts + 1);
                setOutcome(1);
            }

            if(cpuMove === "paper") {
                setOutcome(0);
            }

            if(cpuMove === "scissors") {
                setCPUPoints((pts) => pts + 1);
                setOutcome(-1);
            }

        }

        if(userMove === "scissors") {

            if(cpuMove === "rock") {
                setCPUPoints((pts) => pts + 1);
                setOutcome(-1);
            }

            if(cpuMove === "paper") {
                setUserPoints((pts) => pts + 1);
                setOutcome(1);
            }

            if(cpuMove === "scissors") {
                setOutcome(0);
            }

        }

    }

    const handleScoreInput = (e) => {

        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];

        const digits = /^[0-9]$/;

        if (allowedKeys.includes(e.key) || digits.test(e.key)) {
            return;
        }

        e.preventDefault();

    }

    const handleRestart = () => {
        setCPUPoints(0);
        setUserPoints(0);
        setOutcome(0);
        setOngoing(false);
        setAnimate(false);
    }
    
    return (

       <div id="game-container">

            <header>
                <h1 onClick={() => navigate("/")}>Rock, Paper, Scissors!</h1>
            </header>

            <div id="game-type">
                <h1>First to </h1>
                <input 
                    type="number" 
                    placeholder={score}
                    onChange={(e) => setScore(e.target.value)}
                    onKeyDown={(e) => handleScoreInput(e)} 
                    disabled={animate}
                />
            </div>

            <div id="gameplay">

                <div className="player">
        
                    {!ongoingRound && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={rockLeft}
                        />

                    )}

                    {ongoingRound && (userMove === "rock") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={rockLeft}
                        />

                    )}

                    {ongoingRound && (userMove === "paper") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={paperLeft}
                        />

                    )}

                    {ongoingRound && (userMove === "scissors") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={scissorsLeft}
                        />

                    )}
                    <h3>Points: {userPoints}</h3>

                    <div id="user-moves">
                        <button 
                            className={userMove === "rock" ? "rock teko selected user-move-button" : "rock teko user-move-button"}
                            onClick={() => {
                                setUserMove("rock")
                                setOngoing(false);
                        }}>Rock</button>
                        <button 
                            className={userMove === "paper" ? "paper teko selected user-move-button" : "paper teko user-move-button"}
                            onClick={() => {
                                setUserMove("paper")
                                setOngoing(false);
                            }}>Paper</button>
                        <button 
                            className={userMove === "scissors" ? "scissors teko selected user-move-button" : "scissors teko user-move-button"}
                            onClick={() => {
                                setUserMove("scissors")
                                setOngoing(false);
                        }}>Scissors</button>
                    </div>

                    
                </div>

                <div className={outcome !== 0 ? "indicator": "indicator collapse"}>
                    {outcome < 0 && (
                        <img className="gameplay-icons" alt="Arrow" src={indicatorRight}/>
                    )}

                    {outcome > 0 && (
                        <img className="gameplay-icons" alt="Arrow" src={indicatorLeft}/>
                    )}
                </div>

                <div className="cpu">

                    {!ongoingRound && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="CPU Move" src={rockRight}
                        />

                    )}

                    {ongoingRound && (cpuMove === "rock") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="CPU Move" src={rockRight}
                        />

                    )}

                    {ongoingRound && (cpuMove === "paper") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="CPU Move" src={paperRight}
                        />

                    )}

                    {ongoingRound && (cpuMove === "scissors") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="CPU Move" src={scissorsRight}
                        />

                    )}

                    <h3>Points: {cpuPoints}</h3>
                </div>

            </div>


            <div id="winning-overlay" className={userPoints === Number(score) || cpuPoints === Number(score) ? "" : "collapse"}>

                <div id="winning-popup">

                     <div id="winning-message">

                        {userPoints === Number(score) && (
                            <h1>You Win!</h1>
                        )}

                        {cpuPoints === Number(score) && (
                            <h1>CPU Wins!</h1>
                        )}
                       
                            
                        <div className="exit-actions">
                            <button id="play-again" className="teko" onClick={() => handleRestart()}>Play Again</button>
                            <button id="main-menu" className="teko" onClick={() => navigate("/")}>Main Menu</button>
                        </div>
                    </div>
                   

                </div>

            </div>

            <div className="gameplay-actions">

                <button
                    id="start"
                    className="teko"
                    onClick={() => handleStartRound()}
                    disabled={animate}
                >
                    Start
                </button>

                <button 
                    id="restart" 
                    className="teko" 
                    onClick={() =>  handleRestart()}
                    disabled={animate}
                    >Restart
                    </button>
                

            </div>

       </div>

    )


}


export default CPU