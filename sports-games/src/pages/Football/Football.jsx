import Header from '../Home/Header.jsx'
import SportsBody from '../SportsBody.jsx';


function Football() {
    return(
        <>
            <Header showBackButton={true} showGameButtons={false}/>
            <SportsBody sport = "NFL"/>
        </>
        
    );
}

export default Football