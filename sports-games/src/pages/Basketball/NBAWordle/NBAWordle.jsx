import Header from "../../Home/Header";
import Wordle from "../../Wordle";

function NBAWordle(){
    return(
        <div>
            <Header showBackButton={true} showGameButtons={true} game='wordle'/>
            <Wordle sport="NBA"/>
            
        </div>
    );
}

export default NBAWordle;