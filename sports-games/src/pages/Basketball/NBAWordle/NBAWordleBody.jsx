import reloadImage from '../../../assets/reload.png'


import React, { useState } from 'react';

function NBAWordleBody(){
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [playerName, setPlayerName] = useState('HARDEN'); 
    const [showHint, setShowHint] = useState(false);
    const [isWinner, setIsWinner] = useState(false); 
    const [numGuesses, setNumGuesses] = useState(0);
    const [hintNum, setHintNum] = useState(0);
    const [reload, setReload] = useState(false);
    const hints = [
        `First Letter Is: ${playerName[0]}`,
        `This Player Averaged 24.6 Points Over The 2021 Season`,
        `This Player Has 0 NBA Championships`
    ];
    const handleChange = (event) => {
        setGuess(event.target.value.trim().toUpperCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (guesses.length >= 6) {
        alert('maximum number of guesses reached!');
        return;
        }
        if (guess.length !== playerName.length) {
        alert('guess must be ' + playerName.length + ' characters long!');
        return;
        }
        if (guess === playerName) {
        setIsWinner(true);
        }
        setNumGuesses(prev => prev + 1);
        setGuesses([...guesses, guess]);
        setGuess('');
        setShowHint(false); 
        if (guesses.length == 5) {
            alert('The player was ' + playerName);
            return;
        }
    };

    const handleReload = () => {
        setGuess('');
        setGuesses([]);
        setPlayerName("LEBRON")
        setShowHint(false);
        setIsWinner(false);
        setNumGuesses(0);
        setHintNum(0);
    }

    const handleHint = () => {
        setShowHint(true); 
    };

    const handleNextHint = () => {
        if (hintNum < hints.length - 1) {
        setHintNum(hintNum + 1);
        }
    };

    const handlePreviousHint = () => {
        if (hintNum > 0) {
        setHintNum(hintNum - 1);
        }
    };

    const close = () => {
        let x = document.getElementById("win-message-container");
        x.style.display = 'none';
    }

    const renderGuess = (g) => {
        return (
        <div key={g}>
            {g.split('').map((letter, index) => {
            const color = letter === playerName[index] ? 'green' :
                            playerName.includes(letter) ? 'yellow' : 'white';
            return <div key={index} className={`guessLetter ${color}`}>{letter} </div>;
            })}
        </div>
        );
    };

    return (
        <div className="wordle-body-container">
            <h1 className="hardle">Wardle</h1>
            <form className="wordle-search-form"onSubmit={handleSubmit}>
                <img className="reload-button" src={reloadImage} alt="Search" id="reload-button" onClick={handleReload}/>
                <input className="guess-box" type="text" value={guess} onChange={handleChange} maxLength={playerName.length} disabled={isWinner || guesses.length >= 6} />
                <button className= 'guess-button' type="submit" disabled={isWinner || guesses.length >= 6}>guess</button>
                <button className='hint-button'type="button" onClick={handleHint} disabled={isWinner || guesses.length >= 6}>hint</button>
                <p className='num-letters'>{playerName.length} Letter Word</p>
            </form>
            <div className="guess-result-container">{guesses.map(renderGuess)}</div>
            {isWinner && <div id="win-message-container" className="win-message-container">
                            <div className="win-message">
                                Congratulations, You Won In {numGuesses} {numGuesses === 1 ? 'Guess Only!' : 'Guesses!'}!
                            </div>
                            <button className= "close-button" onClick={close}>x</button>
                          </div>}
            <HintModal isOpen={showHint} onClose={() => setShowHint(false)} hints={hints} hintNum={hintNum} onNext={handleNextHint} onPrevious={handlePreviousHint} />
        </div>
    );
}

function HintModal({ isOpen, onClose, hints, hintNum, onNext, onPrevious }) {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="hint-header">
            <h2>Hints</h2>
          </div>
          <p className="hint-text">{hints[hintNum]}</p>
        <button className="left-arrow arrow" id= "arrows" onClick={onPrevious} disabled={hintNum <= 0}>←</button>
        <button className= "close-button" id="hint-box-button" onClick={onClose}>x</button>
        <button className="right-arrow arrow" id= "arrows" onClick={onNext} disabled={hintNum >= hints.length - 1}> →</button>
        </div>
      </div>
    );
}



export default NBAWordleBody;