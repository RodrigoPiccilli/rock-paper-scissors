import React, {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

import rockLeft from "./images/rock.png"
import paperLeft from "./images/paper.png"
import scissorsLeft from "./images/scissors.png"


import rockRight from "./images/rock-reverse.png"
import paperRight from "./images/paper-reverse.png"
import scissorsRight from "./images/scissors-reverse.png"

import indicatorLeft from "./images/indicatorLeft.png"
import indicatorRight from "./images/indicatorRight.png"


const Multiplayer = () => {

    const [animate, setAnimate] = useState(false);

    const [user1Move, setUser1Move] = useState('rock');

    const [user2Move, setUser2Move] = useState('rock');

    const [user1Points, setUser1Points] = useState(0);

    const [user2Points, setUser2Points] = useState(0);

    const [ongoingRound, setOngoing] = useState(false);

    const [outcome, setOutcome] = useState(0);

    const [score, setScore] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {

        const handleKeyDown = (event) => {

            const allowedKeys = ['a', 's', 'd', 'j', 'k', 'l'];

            if(event.key === allowedKeys[0]) {
                setUser1Move("rock");
                setOngoing(false);
            }

            if(event.key === allowedKeys[1]) {
                setUser1Move("paper");
                setOngoing(false);
            }

            if(event.key === allowedKeys[2]) {
                setUser1Move("scissors");
                setOngoing(false);
            }

            if(event.key === allowedKeys[3]) {
                setUser2Move("rock");
                setOngoing(false);
            }

            if(event.key === allowedKeys[4]) {
                setUser2Move("paper");
                setOngoing(false);
            }

            if(event.key === allowedKeys[5]) {
                setUser2Move("scissors");
                setOngoing(false);
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

        setTimeout( () => {
            roundOutcome(user2Move);
            setAnimate(false);
            setOngoing(true);
        }, 4000);

        setOngoing(false);



    }

    const roundOutcome = (user2Move) => {

        if(user1Move === "rock") {

            if(user2Move === "rock") {
                setOutcome(0);
            }

            if(user2Move === "paper") {
                setUser2Points((pts) => pts + 1);
                setOutcome(-1);
            }

            if(user2Move === "scissors") {
                setUser1Points((pts) => pts + 1);
                setOutcome(1);
            }

        } 

        if(user1Move === "paper") {

            if(user2Move === "rock") {
                setUser1Points((pts) => pts + 1);
                setOutcome(1);
            }

            if(user2Move === "paper") {
                setOutcome(0);
            }

            if(user2Move === "scissors") {
                setUser2Points((pts) => pts + 1);
                setOutcome(-1);
            }

        }

        if(user1Move === "scissors") {

            if(user2Move === "rock") {
                setUser2Points((pts) => pts + 1);
                setOutcome(-1);
            }

            if(user2Move === "paper") {
                setUser1Points((pts) => pts + 1);
                setOutcome(1);
            }

            if(user2Move === "scissors") {
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
        setUser2Points(0);
        setUser1Points(0);
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

                    {ongoingRound && (user1Move === "rock") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={rockLeft}
                        />

                    )}

                    {ongoingRound && (user1Move === "paper") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={paperLeft}
                        />

                    )}

                    {ongoingRound && (user1Move === "scissors") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User Move" src={scissorsLeft}
                        />

                    )}
                    <h3>Points: {user1Points}</h3>

                    <div className="user-moves">
                        <button 
                            className={user1Move === "rock" ? "rock teko user-move-button" : "rock teko user-move-button"}
                            onClick={() => {
                                setUser1Move("rock")
                                setOngoing(false);
                            }}
                            disabled={animate}
                        >Rock</button>
                        <button 
                            className={user1Move === "paper" ? "paper teko user-move-button" : "paper teko user-move-button"}
                            onClick={() => {
                                setUser1Move("paper")
                                setOngoing(false);
                            }}
                            disabled={animate}
                            >Paper</button>
                        <button 
                            className={user1Move === "scissors" ? "scissors teko user-move-button" : "scissors teko user-move-button"}
                            onClick={() => {
                                setUser1Move("scissors")
                                setOngoing(false);
                            }}
                            disabled={animate}
                            >Scissors</button>
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

                <div className="user2">

                    {!ongoingRound && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User 2 Move" src={rockRight}
                        />

                    )}

                    {ongoingRound && (user2Move === "rock") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User 2 Move" src={rockRight}
                        />

                    )}

                    {ongoingRound && (user2Move === "paper") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User 2 Move" src={paperRight}
                        />

                    )}

                    {ongoingRound && (user2Move === "scissors") && (

                        <img 
                            className={animate ? "gameplay-icons animate-hands": "gameplay-icons"}
                            alt="User 2 Move" src={scissorsRight}
                        />

                    )}

                    <h3>Points: {user2Points}</h3>

                    <div className="user-moves">
                        <button 
                            className={user2Move === "rock" ? "rock-2 teko user-move-button" : "rock-2 teko user-move-button"}
                            onClick={() => {
                                setUser2Move("rock")
                                setOngoing(false);
                            }}
                            disabled={animate}>
                            Rock</button>
                        <button 
                            className={user2Move === "paper" ? "paper-2 teko user-move-button" : "paper-2 teko user-move-button"}
                            onClick={() => {
                                setUser2Move("paper")
                                setOngoing(false);
                            }}
                            disabled={animate}
                            >Paper</button>
                        <button 
                            className={user2Move === "scissors" ? "scissors-2 teko user-move-button" : "scissors-2 teko user-move-button"}
                            onClick={() => {
                                setUser2Move("scissors")
                                setOngoing(false);
                            }}
                            disabled={animate}
                        >Scissors</button>
                    </div>
                </div>
                

            </div>


            <div id="winning-overlay" className={user1Points === Number(score) || user2Points === Number(score) ? "" : "collapse"}>

                <div id="winning-popup">

                     <div id="winning-message">

                        {user1Points === Number(score) && (
                            <h1>Player 1 Win!</h1>
                        )}

                        {user2Points === Number(score) && (
                            <h1>Player 2 Wins!</h1>
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


export default Multiplayer