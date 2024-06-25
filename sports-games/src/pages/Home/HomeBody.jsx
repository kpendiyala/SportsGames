import { useNavigate } from 'react-router-dom'

function Body(){
    const navigate = useNavigate();
    return(
        <div className="body-container">
            <div className="basketball-container sports-container" onClick={() => navigate('/basketball')}>
                <h1>Basketball</h1>
            </div>
            <div className="football-container sports-container" onClick={() => navigate('/football')}>
                <h1>Football</h1>
            </div>
            <div className="soccer-container sports-container" onClick={() => navigate('/soccer')}>
                <h1>Soccer</h1>
            </div>

        </div>
    ); 
}

export default Body;