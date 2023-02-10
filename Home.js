import React from 'react'
import {Link} from 'react-router-dom'


const Home = () =>{
       
    
    
    return(
       <div className='home-page'>
           <h3>Quiziccal</h3>
           <p>Lets play the Quiz Game</p>
           <Link className='reset-btn' to='/quiz'>Start quiz</Link>
       </div> 
       
      
       
    )
}


export default Home