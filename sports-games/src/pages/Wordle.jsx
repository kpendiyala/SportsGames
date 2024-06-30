import reloadImage from "../assets/reload.png";
import axios from 'axios';
import React, { useState , useEffect} from "react";

function Wordle() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [playerName, setPlayerName] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [numGuesses, setNumGuesses] = useState(0);
  const [hintNum, setHintNum] = useState(0);
  const [reload, setReload] = useState(false);
  const [hints, setHints] = useState([]);
  const handleChange = (event) => {
    setGuess(event.target.value.trim().toUpperCase());
  };
  const [loading, setLoading] = useState(true);
  const popularNBALastNames = [
                "James", "Curry", "Durant", "Harden", "Antetokounmpo",
                "Davis", "Doncic", "Lillard", "Beal", "Butler",
                "George", "Leonard", "Thompson", "Booker", "Irving",
                "Embiid", "Jokic", "Towns", "Mitchell", "Gobert",
                "Edwards", "LaVine", "DeRozan", "Vucevic", "Ball",
                "Ayton", "Paul", "Holiday", "Poole", "Green",
                "Drummond", "Brunson", "Sabonis", "Wiggins", "Simmons",
                "Porzingis", "Murray", "Young", "Fox", "Morant",
                "Adebayo", "Brown", "Tatum", "Middleton", "McCollum",
                "Ingram", "Siakam", "VanVleet", "Lowry", "Harris",
                "Turner", "Jackson", "Smart", "Maxey", "Collins",
                "Bridges", "Herro", "Bane", "Barnes", "Williams",
                "Capela", "Rozier", "Gordon", "Hayward", "Allen",
                "LeVert", "Grant", "Sengun", "Randle", "McGee",
                "Payton", "Bazley", "Caruso", "Huerter", "Powell",
                "Kleber", "Richardson", "Isaac", "McDaniels", "Zubac",
                "Lopez", "Portis", "Forbes", "Gafford", "Simons",
                "Washington", "White", "Pritchard", "Carter", "Vassell",
                "Johnson", "Wagner", "Anthony", "Okoro", "Mobley",
                "Garland", "Allen", "Suggs", "Fultz",
                "Ross", "Markkanen", "Sexton", "Mitchell", "Clarkson",
                "Olynyk", "Conley", "Williamson", "McCollum", "Valanciunas",
                "Ingram", "Jones", "Hart", "Murphy", "Alvarado",
                "Alexander-Walker", "Claxton", "O'Neale", "Harris",
                "Mills", "Thomas", "Sharp", "Durant",
                "Simmons", "Bembry", "Nunn", "Reaves", "Gabriel",
                "Schroder", "Brown", "Walker", "Anderson",
                "Reid", "Prince", "Forbes",
                "Rivers", "Taylor",
                "Williams", "Wright",
                "Zubac", "Zion",
                "Gilgeous-Alexander"
            ];

  useEffect(() => {
    const fetchHints = async () => {
      setLoading(true);
      const apiKey = "c89a62e7-d01a-40ba-abb2-6a839c2da619"; 
      const randomLastName = popularNBALastNames[Math.floor(Math.random() * popularNBALastNames.length)];

      try {
        const players = await axios.get("https://api.balldontlie.io/v1/players", {
          headers: {
            'Authorization': `${apiKey}`
          },
          params: {
            last_name: randomLastName
          }
        });

        const playerID = players.data.data[0].id;
        const draftYear = players.data.data[0].draft_year;

        const stats = await axios.get("https://api.balldontlie.io/v1/season_averages", {
          headers: {
            'Authorization': `${apiKey}`
          },
          params: {
            season: 2023,
            player_ids: [playerID]
          }
        });

        const points = stats.data.data[0].pts.toFixed(1);
        const assists = stats.data.data[0].ast.toFixed(1);
        const gamesPlayed = stats.data.data[0].games_played;

        setPlayerName(randomLastName.toUpperCase());
        setHints([
          `First letter is: ${randomLastName[0]}`,
          `This player averaged ${points} points over the 2023-2024 season`,
          `This player averaged ${assists} assists over the 2023-2024 season`,
          `This player was drafted in ${draftYear}`,
          `This player played ${gamesPlayed} games over the 2023-2024 season`
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        setLoading(false); // End loading
      }
    };

    fetchHints();
  }, [reload]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (guesses.length >= 6) {
      alert("maximum number of guesses reached!");
      return;
    }
    if (guess.length !== playerName.length) {
      alert("guess must be " + playerName.length + " characters long!");
      return;
    }
    if (guess === playerName) {
      setIsWinner(true);
    }
    setNumGuesses((prev) => prev + 1);
    setGuesses([...guesses, guess]);
    setGuess("");
    setShowHint(false);
    if (guesses.length == 5) {
      alert("The player was " + playerName);
      return;
    }
  };

  const handleReload = () => {
    setGuess("");
    setGuesses([]);
    setShowHint(false);
    setIsWinner(false);
    setNumGuesses(0);
    setHintNum(0);
    setReload((prev) => !prev); 
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

  const close = () => {
    let x = document.getElementById("win-message-container");
    x.style.display = "none";
  };

  const renderGuess = (g) => {
    return (
      <div key={g}>
        {g.split("").map((letter, index) => {
          const color =
            letter === playerName[index]
              ? "green"
              : playerName.includes(letter)
              ? "yellow"
              : "white";
          return (
            <div key={index} className={`guessLetter ${color}`}>
              {letter}{" "}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="wordle-body-container">
    
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <>
          <h1 className="hardle">Wardle</h1>
          <form className="wordle-search-form" onSubmit={handleSubmit}>
            <img
              className="reload-button"
              src={reloadImage}
              alt="Reload"
              id="reload-button"
              onClick={handleReload}
            />
            <input
              className="guess-box"
              type="text"
              value={guess}
              onChange={handleChange}
              maxLength={playerName.length}
              disabled={isWinner || guesses.length >= 6}
            />
            <button
              className="guess-button"
              type="submit"
              disabled={isWinner || guesses.length >= 6}
            >
              Guess
            </button>
            <button
              className="hint-button"
              type="button"
              onClick={handleHint}
              disabled={isWinner || guesses.length >= 6}
            >
              Hint
            </button>
            <p className="num-letters">{playerName.length} Letter Word</p>
          </form>
          <div className="guess-result-container">{guesses.map(renderGuess)}</div>
          {isWinner && (
            <div id="win-message-container" className="win-message-container">
              <div className="win-message">
                Congratulations, You Won In {numGuesses}{" "}
                {numGuesses === 1 ? "Guess Only!" : "Guesses!"}!
              </div>
              <button className="close-button" onClick={close}>
                x
              </button>
            </div>
          )}
          <HintModal
            isOpen={showHint}
            onClose={() => setShowHint(false)}
            hints={hints}
            hintNum={hintNum}
            onNext={handleNextHint}
            onPrevious={handlePreviousHint}
          />
        </>
      )}
    </div>
  );
}

function HintModal({ isOpen, onClose, hints, hintNum, onNext, onPrevious }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="hint-header">
          <h2>Hints</h2>
        </div>
        <p className="hint-text">{hints[hintNum]}</p>
        <button
          className="left-arrow arrow"
          id="arrows"
          onClick={onPrevious}
          disabled={hintNum <= 0}
        >
          ←
        </button>
        <button className="close-button" id="hint-box-button" onClick={onClose}>
          x
        </button>
        <button
          className="right-arrow arrow"
          id="arrows"
          onClick={onNext}
          disabled={hintNum >= hints.length - 1}
        >
          {" "}
          →
        </button>
      </div>
    </div>
  );
}

export default Wordle;