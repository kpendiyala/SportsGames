import Header from '../Home/Header.jsx'
import SportsBody from '../SportsBody.jsx';

function Basketball() {
    return(
        <>
            <Header showBackButton={true} showGameButtons={false}/>
            <SportsBody sport = "NBA"/>
        </>
        
    );
}

export default Basketball