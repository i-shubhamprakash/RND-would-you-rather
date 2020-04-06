import React,{useState,useEffect} from 'react'
import Question from './Question'
import '../styles/home.scss'
import { useSelector } from 'react-redux'


export default function Home(props) {
  const [tab,setTab]=useState('unanswered')
  const users = useSelector(state => state.users)


  useEffect(() => {
    console.log("Props in home-",props)
  })

  const renderQuestion=(questions,tab)=>{
    const questionList= Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    const requiredList=questionList.filter(id=>{
      if(tab==='answered'){
        return isAanswered(id, questions)
      }else{
        return !isAanswered(id, questions)
      }
    })

    return requiredList.length? requiredList.map(id=><Question key={id} questionId={id} questions={questions} users={users} />): <div className="empty-page"><p>No questions availabe</p></div>
  }

  const isAanswered=(id, questions)=>{

    if(questions[id].optionOne.votes.length >0 || questions[id].optionTwo.votes.length)
      return true

    return false
  }

  return (
    <div className="home">
      <Tab tab={tab} setTab={setTab}/>
      {renderQuestion(props.questions,tab)}
    </div>
  )
}

function Tab(props){
  return(
    <div className="tab">
      <div className={props.tab == 'unanswered'? 'active':null} onClick={e=>props.setTab('unanswered')}>Unanswered Questions</div>
      <div className={props.tab == 'answered'? 'active':null} onClick={e=>props.setTab('answered')}>Answered Questions</div>
    </div>
  )
}
