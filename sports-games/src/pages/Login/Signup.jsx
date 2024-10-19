import { useState } from "react";
import Login from "./Login";


function Signup(props){
    const [showPassword, setShowPassword] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const close = () => {
        let x = document.getElementById("signup-container");
        x.style.display = 'none';
        props.handleClose();
    }

    const handleChange = () => {
        setShowPassword(!showPassword);
    }

    const handleLoginPage = () => {
        setShowLoginPage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
    }

    return(
    <>
        {showLoginPage ?
            <Login handleClose={props.handleClose}/> 
        : 
            <div id="signup-container" className="login-container popup-container">   
            <h1 className="login-header">Signup</h1>
            <form className="login-form-container">
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='login-input-box' type='text' placeholder="set username" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='login-input-box' type={showPassword ? "text" : "password"} placeholder="set password" />
                <div className="show-password">
                    <p className="show-password-text">Show password</p>
                    <input className="show-password-button" type="checkbox" onClick={() => handleChange()} />
                </div> 
                <button className="login-submit-button" onClick={handleSubmit}>Signup</button>
                <h3 className="or-text">or</h3>
                <button type="button" className="login-submit-button" onClick={handleLoginPage}>Login</button>
                <button type="button" className= "close-button" onClick={close}>x</button>
            </form>
            </div>}
    </>
    );
}

export default Signup;