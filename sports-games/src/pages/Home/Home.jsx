import Header from './Header.jsx'
import Body from './HomeBody.jsx'

function Home() {
    return(
        <>
            <Header showBackButton={false} showGameButtons={false}/>
            <Body />
        </>
        
    );
}

export default Home;
