import React, {useEffect,useState} from 'react'
import {nanoid} from 'nanoid'

const Context = React.createContext()

const ContextProvider = ({children}) =>{
    const [quiziccal, setQuiziccal] = useState([])
    const [options, setOptions] = useState([])
    const[score, setScore] = useState(0)
    const [newGame, setNewGame] = useState(false)
    const [clicked, setClicked] = useState(false)

    
    
   
      
   const url= "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy"
   useEffect(() =>{
       fetch(url)
       .then(res => res.json())
       .then(data => setQuiziccal(data.results.map(prevQuiz =>(
           {
               ...prevQuiz,
               id: nanoid(),
               selectedAnswer: ''
           }
       ))))
       
   },[newGame])
   
   useEffect(() =>{
       if(!options.length){
           setOptions(quiziccal.map(quiz => {
               const incorrectAnswers = [...quiz.incorrect_answers]
               incorrectAnswers.push(quiz.correct_answer)
               const answers = incorrectAnswers.sort(() => Math.random() - 0.5)
               return {
                        question: quiz.question,
                        answers: answers,
                        id: quiz.id,
                        correct_answer: quiz.correct_answer
                       }
                  
                                
       }))
       }
   }, [quiziccal])
   
   const selectedAnswer = (option,answer) => {
         setQuiziccal(prevQuiz => prevQuiz.map(question =>(
             question.id !== option.id ? question :
             {
                 ...question,
                 selectedAnswer: answer
             }
         )))
         setOptions(prevOptions => prevOptions.map(opt => (
             opt.id !== option.id ? opt : 
             {
                 ...opt,
                 selectedAnswer: answer
             }
         )))
         
     }
   
   const checkScore = () =>{
       let count = 0
       quiziccal.map(quiz => {
            
            return quiz.correct_answer === quiz.selectedAnswer ? count++ : count
       })
       setScore(count)
       setNewGame(true)
       setClicked(true)
   }
   
   const resetGame = () =>{
       setNewGame(false)
       setQuiziccal([])
       setScore(0)
       setOptions([])
       setClicked(false)
   }
   
   
  const quizElements = options.map((option) => {

       const questions = option.question
       const answerElements = option.answers.map((answer) => { 
           
           
           
           const selectedAnswerStyle = {
               backgroundColor: '#F9E40A',
               opacity: '0.7'
           }
           
           const correctAnswerStyle = {
               backgroundColor: 'green'
           }
           
           const wrongAnswerStyle = {
               backgroundColor: '#F8BCBC'
           }
           
           let style;
                if(score>0 || clicked){
                    if(answer === option.correct_answer && answer === option.selectedAnswer){
                        style = correctAnswerStyle
                    }else if(answer !== option.correct_answer && answer === option.selectedAnswer){
                        style = wrongAnswerStyle
                    }else if(answer === option.correct_answer){
                        style = correctAnswerStyle
                    }
                } else if(answer === option.selectedAnswer){
               style = selectedAnswerStyle
           }
            
           
           return <button 
           onClick={() =>selectedAnswer(option, answer)}
           className='btn-element' key={nanoid()} style={style} 
           >
           {answer}
           </button>
       })
      
      return(
          <div className='div-elements' key={nanoid()}>
               <h3 className='questions' >{questions}</h3>
               {answerElements}
          </div>
      )
  })
    
    
    
    return(
        <Context.Provider value={{quizElements, checkScore, score, newGame, resetGame, quiziccal}}>
                     {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}