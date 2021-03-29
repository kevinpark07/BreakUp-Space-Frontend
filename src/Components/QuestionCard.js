import React from 'react';
import styled from 'styled-components';

const QuestionCard = (props) => {
    const handleClick = (event) => {
        props.handleClick(event.target)
    }

    const renderAnswers = () => {
        let answers = props.answers.split('|');
        return answers.map(answer => {
            let lastAnswer;
            answers.indexOf(answer) === answers.length - 1 ? lastAnswer = true : lastAnswer = false;
            return <Answer lastAnswer={lastAnswer} key={answer} id={answers.indexOf(answer) + 1} onClick={handleClick}>{answer}</Answer>;
        })
    }

    return (
        <>
            <QuestionContainer>
                <QuestionHeader>{props.question}</QuestionHeader>
            </QuestionContainer>

            <AnswerList>
                {renderAnswers()}
            </AnswerList>
        </>
    )
}

export default QuestionCard;

const QuestionContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 20px;
`

const QuestionHeader = styled.h3`
    border-radius: 20px;
    padding: 8px 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
    margin-right: 25%;
    background-color: #EAEAEA;
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
        background: #EAEAEA;
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
        background: white;
        border-bottom-right-radius: 10px;
      }
`

const AnswerList = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0px 20px;
    font-size: 16px;
`

const Answer = styled.div`
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
    ${props => props.lastAnswer ?
        `margin-bottom: 30px;
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
            background: white;
            border-bottom-left-radius: 10px;
          }
        ` 
    : null}

`