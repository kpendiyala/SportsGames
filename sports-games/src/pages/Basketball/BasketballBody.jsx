import { useNavigate } from 'react-router-dom'

function BasketballBody(){
    const navigate = useNavigate();
    return(
        <div className="basketball-games-container">
            <div className="wordle-container basketball-game-container" onClick={() => navigate('/basketball/wordle')}>
                <h1>NBA Wordle</h1>
            </div>
            <div className="guess-who-container basketball-game-container" onClick={() => navigate('/basketball/guess-who')}>
                <h1>NBA Guess Who</h1>
                </div>
            <div className="tbd-container-1 basketball-game-container">
                <h1>TBD</h1> 
            </div>
            <div className="tbd-container-2 basketball-game-container">
                <h1>TBD</h1>
            </div>

        </div>
    );

}

export default BasketballBody