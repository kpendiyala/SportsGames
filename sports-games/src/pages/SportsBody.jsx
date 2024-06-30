import { useNavigate } from 'react-router-dom'

function SportsBody(props){
    const navigate = useNavigate();
    return(
        <div className="sports-games-container">
            <div className="wordle-container sports-game-container" onClick={() => navigate('./wordle')}>
                <h1>{props.sport} Wordle</h1>
            </div>
            <div className="guess-who-container sports-game-container" onClick={() => navigate('./guess-who')}>
                <h1>{props.sport} Guess Who</h1>
                </div>
            <div className="tbd-container-1 sports-game-container">
                <h1>{props.sport} TBD</h1> 
            </div>
            <div className="tbd-container-2 sports-game-container">
                <h1>{props.sport} TBD</h1>
            </div>

        </div>
    );

}

export default SportsBody