import profileImage from '../../assets/profile.webp'
import questionMarkImage from '../../assets/questionMarkButton.png'
import statsImage from '../../assets/stats.png'
import logoImage from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'
import Help from '../Help.jsx'
import { useState } from 'react'

function Header(props){
    const navigate = useNavigate();
    const [showLoginPage, setShowloginPage] = useState(false);
    const [showHelpPage, setShowHelpPage] = useState(false);

    const handleHelpPage = () => {
        setShowHelpPage(!showHelpPage);
    };

    const handleLoginPage = () => {
        setShowloginPage(!showLoginPage);
    };

    return (
        <div className="header-container">
            {
                props.showBackButton ? <button className='back-button' onClick={() => navigate('./..')}>
                                &lt; BACK
                            </button> : null
            }
            <div className='website-title-container' onClick={() => navigate('/home')}>
                <img className="logo-image" src={logoImage} alt="logo"></img>
                <h1 className="website-title-text">Playmaker</h1>
            </div>
            {
            props.showGameButtons ? 
                <div className='icons-container'>
                    <img className="header-icon-image button" src={statsImage} alt="stats"></img>
                    <img className="header-icon-image button" src={questionMarkImage} alt="help" onClick={handleHelpPage}></img>
                    <img className="header-icon-image button" src={profileImage} alt="profile" onClick={handleLoginPage}></img>

                </div> 
                : 
                <div className='icons-container'>
                    <img className="header-icon-image button" src={profileImage} alt="profile" onClick={handleLoginPage}></img>
                </div> 
            }
            {showLoginPage ?<Login handleClose={handleLoginPage}/> : null}
            {showHelpPage ?<Help game={props.game} handleClose={handleHelpPage}/> : null}
        </div>
    )
}

Header.defualtProps = {
    showBackButton: true,
    showGameButtons: false,
    game: ''
}

export default Header