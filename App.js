import React from 'react'
import {Link,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Quiz from './Quiz'


const App = () =>{
       
    
    
    return(
       
       
       <Switch>
            <Route exact path='/'><Home /></Route>
            <Route  path='/quiz'><Quiz /></Route>
       </Switch>
       
    )
}


export default App




//https://opentdb.com/api.php?amount=5&category=17&difficulty=easy