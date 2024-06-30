import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Basketball from './pages/Basketball/Basketball.jsx'
import Football from './pages/Football/Football.jsx'
import Soccer from './pages/Soccer/Soccer.jsx'
import NBAGuessWho from './pages/Basketball/NBAGuessWho/NBAGuessWho.jsx'
import NBAWordle from './pages/Basketball/NBAWordle/NBAWordle.jsx'
import NFLWordle from './pages/Football/NFLWordle/NFLWordle.jsx'
import SoccerWordle from './pages/Soccer/SoccerWordle/SoccerWordle.jsx'
import SoccerGuessWho from './pages/Soccer/SoccerGuessWho/SoccerGuessWho.jsx'
import NFLGuessWho from './pages/Football/NFLGuessWho/NFlGuessWho.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>  
        <Route index element = {<Home />} />
        <Route path='/home' element = {<Home />}/>
        <Route path='/basketball' element = {<Basketball />}/>  
        <Route path='/football' element = {<Football />}/>  
        <Route path='/soccer' element = {<Soccer />}/>
        <Route path='/basketball/wordle' element = {<NBAWordle />}/>
        <Route path='/football/wordle' element = {<NFLWordle />}/> 
        <Route path='/soccer/wordle' element = {<SoccerWordle />}/> 
        <Route path='/football/guess-who' element = {<NFLGuessWho />}/> 
        <Route path='/basketball/guess-who' element = {<NBAGuessWho />}/>
        <Route path='/soccer/guess-who' element = {<SoccerGuessWho />}/>
    
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
