import React, { useState } from 'react';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [playerName, setPlayerName] = useState('HARDEN'); 
  const [showHint, setShowHint] = useState(false);
  const [isWinner, setIsWinner] = useState(false); 
  const [numGuesses, setNumGuesses] = useState(0);
  const [hintNum, setHintNum] = useState(0);
  const hints = [
    `first letter is: ${playerName[0]}`,
    `this player averaged 24.6 points over the 2021 season`,
    `this player has 0 nba championships`
  ];


  const handleChange = (event) => {
    setGuess(event.target.value.toUpperCase());
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
  };

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

  const renderGuess = (g) => {
    return (
      <div key={g}>
        {g.split('').map((letter, index) => {
          const color = letter === playerName[index] ? 'green' :
                        playerName.includes(letter) ? 'yellow' : 'grey';
          return <span key={index} style={{ color: color }}>{letter} </span>;
        })}
      </div>
    );
  };

   return (
    <div className="App">
      <header className="App-header">
        <h1>NBAdle (idk what to call it rn)</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="./images/magnifying-glass.png" alt="Search" id="magnifying-glass" style={{ width: '32px', height: '32px'}} />
          <input type="text" value={guess} onChange={handleChange} maxLength={playerName.length} disabled={isWinner || guesses.length >= 6} />
          <button type="submit" disabled={isWinner || guesses.length >= 6}>guess</button>
          <button type="button" onClick={handleHint} disabled={isWinner || guesses.length >= 6}>hint</button>
        </form>
        {guesses.map(renderGuess)}
        {isWinner && <div className="win-message">congratulations, you won in {numGuesses} {numGuesses === 1 ? 'guess only!' : 'guesses!'}!</div>}
        <HintModal isOpen={showHint} onClose={() => setShowHint(false)} hints={hints} hintNum={hintNum} onNext={handleNextHint} onPrevious={handlePreviousHint} />
      </header>
    </div>
  );

}
function HintModal({ isOpen, onClose, hints, hintNum, onNext, onPrevious }) {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="hint-header">
            <h2>hints</h2>
            <img src="./images/bang-bang.png" alt="Search"  style={{ width: '50px', height: '80px' }} />
          </div>
          <p>{hints[hintNum]}</p>
          <div className = "hint-buttons">
            <button id= "arrows" onClick={onPrevious} disabled={hintNum <= 0}>←</button>
            <button id="hint-box-button" onClick={onClose}>okay!</button>
            <button id= "arrows" onClick={onNext} disabled={hintNum >= hints.length - 1}> →</button>
          </div>
        </div>
      </div>
    );
}

export default App;
