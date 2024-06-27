function Login(props){
    const close = () => {
        let x = document.getElementById("login-container");
        x.style.display = 'none';
        props.handleClose();
    }
    return(
        <div id="login-container" className="login-container popup-container">   
            <h1 className="login-header">Login</h1>
            <form className="login-form-container">
                <input className='login-input-box' type='text' placeholder="username" />
                <input className='login-input-box' type='text' placeholder="password" />
                <button className="login-submit-button">Login</button>
                <h3 className="or-text">or</h3>
                <button className="login-submit-button">Signup</button>
                <button className= "close-button" onClick={close}>x</button>
            </form>
        </div>
        
    );
}

export default Login;