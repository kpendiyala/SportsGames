import Header from "../../Home/Header";
import Wordle from "../../Wordle";

function SoccerGuessWho(){
    return(
        <div>
            <Header showBackButton={true} showGameButtons={true} game='wordle'/>
            <Wordle />
            
        </div>
    );
}

export default SoccerGuessWho;