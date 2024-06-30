import Header from '../Home/Header.jsx'
import SportsBody from '../SportsBody.jsx';


function Soccer() {
    return(
        <>
            <Header showBackButton={true} showGameButtons={false}/>
            <SportsBody sport = "Soccer"/>
        </>
        
    );
}

export default Soccer