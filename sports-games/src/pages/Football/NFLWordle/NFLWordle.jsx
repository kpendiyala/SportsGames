import Header from "../../Home/Header";
import Wordle from "../../Wordle";

function NFLWordle(){
    return(
        <div>
            <Header showBackButton={true} showGameButtons={true} game='wordle'/>
            <Wordle sport="NFL"/>
            
        </div>
    );
}

export default NFLWordle;