import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Basketball from './pages/Basketball/Basketball.jsx'
import Football from './pages/Football/Football.jsx'
import Soccer from './pages/Soccer/Soccer.jsx'
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
