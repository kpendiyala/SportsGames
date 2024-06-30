import Header from "../../Home/Header";
import Wordle from "../../Wordle";

function NFLGuessWho(){
    return(
        <div>
            <Header showBackButton={true} showGameButtons={true} game='wordle'/>
            <Wordle />
            
        </div>
    );
}

export default NFLGuessWho;