import { useState } from "react";
import Signup from "./Signup";

function Login(props){
    const [showPassword, setShowPassword] = useState(false);
    const [showSignupPage, setShowSignupPage] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const close = () => {
        let x = document.getElementById("login-container");
        x.style.display = 'none';
        props.handleClose();
    }

    const handleChange = () => {
        setShowPassword(!showPassword);
    }

    const handleSignupPage = () => {
        setShowSignupPage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            alert(data.msg || "Login failed");
            return;
          }
    
          alert("Login successful!");
          props.handleClose();
        } catch (err) {
          console.error(err);
          alert("An error occurred during login");
        }
      };

      return (
        <>
          {showSignupPage ? (
            <Signup handleClose={props.handleClose} />
          ) : (
            <div id="login-container" className="login-container popup-container">
              <h1 className="login-header">Login</h1>
              <form className="login-form-container" onSubmit={handleSubmit}>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='login-input-box'
                  type='text'
                  placeholder="username"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='login-input-box'
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                />
                <div className="show-password">
                  <p className="show-password-text">Show password</p>
                  <input
                    className="show-password-button"
                    type="checkbox"
                    onClick={handleChange}
                  />
                </div>
                <button className="login-submit-button" type="submit">Login</button>
                <h3 className="or-text">or</h3>
                <button type="button" className="login-submit-button" onClick={handleSignupPage}>Signup</button>
                <button type="button" className="close-button" onClick={close}>x</button>
              </form>
            </div>
          )}
        </>
      );
}

export default Login;