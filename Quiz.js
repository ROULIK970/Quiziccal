import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from './Context'
import {nanoid} from 'nanoid'


const Quiz = () =>{
    
    const {quizElements, checkScore, score, newGame, resetGame, quiziccal} = useContext(Context)
    
   
    
    
    return( 
        <div className='app-body'>  
             {quiziccal.length > 0 ?
             <div>
             {quizElements}
             {newGame && <p className='score-result' >YOU SCORED {score}/5</p>}
             {!newGame && <button className='check-name' onClick={checkScore}>Check Score</button>}
             {newGame && <Link className='reset-btn' to='/' onClick={resetGame}>Play Again</Link>} 
             </div>
             :
             
             <p className='app-loading'>Loading...</p>
             
            } 
        
             
        </div>
    ) 
}

export default Quiz 


