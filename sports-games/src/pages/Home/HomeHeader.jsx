import profileImage from '../../assets/profile.webp'
import questionMarkImage from '../../assets/questionMarkButton.png'
import statsImage from '../../assets/stats.png'
import logoImage from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function Header(props){
    const navigate = useNavigate();
    return (
        <div className="header-container">
            {
                props.show ? <button className='back-button' onClick={() => navigate(-1)}>
                                &lt; BACK
                            </button> : null
            }
            <div className='website-title-container' onClick={() => navigate('/home')}>
                <img className="logo-image" src={logoImage} alt="logo"></img>
                <h1 className="website-title-text">Playmaker</h1>
            </div>
            <div className='icons-container'>
                <img className="header-icon-image button" src={questionMarkImage} alt="help"></img>
                <img className="header-icon-image button" src={statsImage} alt="stats"></img>
                <img className="header-icon-image button" src={profileImage} alt="profile"></img>
            </div>
        </div>
    )
}

export default Header