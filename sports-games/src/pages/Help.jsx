function Help (props){

    const close = () => {
        let x = document.getElementById("help-container");
        x.style.display = 'none';
        props.handleClose();
    }

    return(
        <div id='help-container' className="popup-container">
               <button className= "close-button" onClick={close}>x</button>
               {props.game === 'wordle' ? 
                    <div className="wordle-help-container">
                        <h1 className="how-to">How To Play</h1>
                        <br></br>
                        <h3>Guess the Player within 6 tries</h3>
                        <ul className="wordle-help-list">
                            <li> Each guess must be a valid length, as indicated in the right-most button </li>
                            <li> The color of the titles will change to show how close your guess was to the word</li>
                        </ul>
                        <h3>Example</h3>
                        <p className="example-wordle">
                            <span className='green-letter-example letter-example'>J</span>
                            <span className='white-letter-example letter-example'>O</span>
                            <span className='white-letter-example letter-example'>R</span>
                            <span className='yellow-letter-example letter-example'>D</span>
                            <span className='white-letter-example letter-example'>A</span>
                            <span className='white-letter-example letter-example'>N</span>
                        </p>
                        <ul className="wordle-help-list">
                            <li><b>J</b> is in the word and in the correct spot</li>
                            <li><b>D</b> is in the word but in the wrong spot</li>
                            <li>The letters <b>O</b>,<b>R</b>,<b>A</b>, and <b>N</b> are not used in the word in any spot</li>

                        </ul>
                    </div> : 
                    null
                
               }
        </div>
    )
}

export default Help;