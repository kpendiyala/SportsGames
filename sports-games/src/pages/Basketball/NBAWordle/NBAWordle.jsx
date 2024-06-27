import HomeHeader from "../../Home/HomeHeader";
import NBAWordleBody from "./NBAWordleBody";

function NBAWordle(){
    return(
        <div>
            <HomeHeader showBackButton={true} showGameButtons={true} game='wordle'/>
            <NBAWordleBody />
            
        </div>
    );
}

export default NBAWordle;