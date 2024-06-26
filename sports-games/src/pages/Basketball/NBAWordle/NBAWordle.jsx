import HomeHeader from "../../Home/HomeHeader";
import NBAWordleBody from "./NBAWordleBody";

function NBAWordle(){
    return(
        <div>
            <HomeHeader show={true}/>
            <NBAWordleBody />
            
        </div>
    );
}

export default NBAWordle;