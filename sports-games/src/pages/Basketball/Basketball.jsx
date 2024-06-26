import HomeHeader from '../Home/HomeHeader.jsx'
import BasketballBody from './BasketballBody.jsx';

function Basketball() {
    return(
        <>
            <HomeHeader showBackButton={true} showGameButtons={false}/>
            <BasketballBody />
        </>
        
    );
}

export default Basketball