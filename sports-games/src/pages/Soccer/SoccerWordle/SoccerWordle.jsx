import Header from "../../Home/Header";
import Wordle from "../../Wordle";

function SoccerWordle(){
    return(
        <div>
            <Header showBackButton={true} showGameButtons={true} game='wordle'/>
            <Wordle sport="Soccer"/>
            
        </div>
    );
}

export default SoccerWordle;