import React, {useState} from 'react';
import {connect} from 'react-redux';
import Quiz from '../Components/Quiz';
import styled from 'styled-components';

const BreakupQuizContainer = (props) => {
    const [startQuiz, setStartQuiz] = useState(true);
    const [topic, setTopic] = useState('')
    const [questions, setQuestions] = useState('');

    const resetQuiz = () => {
        setStartQuiz(true);
    }

    const handleClick = (event) => {
        setStartQuiz(false);
        let selectedTopic = event.target.innerText.toLowerCase();
        let topicQuestions = props.topics.find(topic => topic.theme === selectedTopic);
        setTopic(topicQuestions.theme);
        setQuestions(topicQuestions.quizzes);
    }

    return (
        <QuizContainer>
            <ScreenContainer>
                {startQuiz ?
                <>
                    <TopicQuestionContainer>
                        <TopicQuestion>Why is it time to say goodbye?</TopicQuestion>
                    </TopicQuestionContainer>

                        <TopicList onClick={handleClick}>
                            <TopicLi>Not ready to date</TopicLi>
                            <TopicLi>Bad timing</TopicLi>
                            <TopicLi>Friendzone</TopicLi>
                            <LastTopicLi>No connection</LastTopicLi>
                        </TopicList>

                </>
                :
                <Quiz resetQuiz={resetQuiz} topic={topic} questions={questions}/>}
            </ScreenContainer>
        </QuizContainer>
    )
}

const msp = state => {
    return {
        topics: state.topics,
    }
}

export default connect(msp, null)(BreakupQuizContainer);

const QuizContainer = styled.div`
    font-family: helvetica;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60vh;
`

const ScreenContainer = styled.div`
    width: 370px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-top: 20px;
    
`

const TopicQuestionContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const TopicQuestion = styled.h3`
    border-radius: 20px;
    padding: 8px 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
    margin-right: 25%;
    background-color: white;
    position: relative;
    font-weight: 600;
    font-size: 16px;
    &:before {
        content: "";
        position: absolute;
        z-index: 0;
        bottom: 0;
        left: -7px;
        height: 20px;
        width: 20px;
        background: white;
        border-bottom-right-radius: 15px;
    }
    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: -10px;
        width: 10px;
        height: 20px;
        background: #EAEAEA;
        border-bottom-right-radius: 10px;
      }
`

const TopicList = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const TopicLi = styled.div`
border-radius: 20px;
padding: 8px 15px;
margin-top: 5px;
margin-bottom: 5px;
display: inline-block;
color: white;
margin-left: 25%;
background: #bfa0e2;
background-attachment: fixed;
position: relative;

    &:hover {
        cursor: pointer;
    }
`

const LastTopicLi = styled(TopicLi)`
margin-bottom: 30px;
&:before{
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    right: -8px;
    height: 20px;
    width: 20px;
    background: #bfa0e2;
    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }
  &:after{
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: -10px;
    width: 10px;
    height: 20px;
    background: #EAEAEA;
    border-bottom-left-radius: 10px;
  }
`