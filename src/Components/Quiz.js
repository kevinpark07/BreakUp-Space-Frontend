import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../Components/QuestionCard';
import ResultCard from '../Components/ResultCard';


const Quiz = (props) => {
    const [count, setCount] = useState(0);
    const [messageSubject, setMessageSubject] = useState('');
    const [messageTone, setMessageTone] = useState({ 'casual': 0, 'friendly': 0, 'direct': 0 });

    const resetQuiz = () => {
        props.resetQuiz();
        setCount(0);
        setMessageTone({ 'casual': 0, 'friendly': 0, 'direct': 0 });
    }

    const nextQuestion = (answer) => {
        if (count === 0 && props.topic !== 'friendzone') {
            setMessageSubject(answer.innerText.toLowerCase());
            setCount(count + 1)
            renderQuestions()
        } else if (messageSubject === "they made me feel uncomfortable" && count === 1) {
            setMessageTone(answer.innerText.toLowerCase())
            setCount(props.questions.length)
            renderQuestions()
        } else {
            switch (parseInt(answer.id)) {
                case 1:
                    setMessageTone({ ...messageTone, casual: messageTone['casual'] + 1 })
                    break;
                case 2:
                    setMessageTone({ ...messageTone, friendly: messageTone['friendly'] + 1 })
                    break;
                case 3:
                    setMessageTone({ ...messageTone, direct: messageTone['direct'] + 1 })
                    break;
                default:
                    break;
            }
            setCount(count + 1)
            renderQuestions()
        }
    }

    let text;

    const renderResult = () => {
        let selectedTone = '';
        for (let tone in messageTone) {
            if (selectedTone !== '' && messageTone[tone] > messageTone[selectedTone]) {
                selectedTone = tone;
            } else if (selectedTone === '') {
                selectedTone = tone;
            }
        }

        let foundMessage;

        if (props.topic === 'no connection' && messageSubject === 'they made me feel uncomfortable') {
            foundMessage = props.messages.find(message => message.tone === messageTone && message.subject === messageSubject);
        } else if (!messageSubject) {
            foundMessage = props.messages.find(message => message.topic.theme === props.topic && message.tone === selectedTone)
        } else {
            foundMessage = props.messages.find(message => message.topic.theme === props.topic && message.tone === selectedTone && message.subject === messageSubject)
        }
        text = foundMessage;
    }

    const renderQuestions = () => {
        if (messageSubject === "you're just not feeling it" && count === 1) {
            setCount(count + 1)
            let selectedQuestion = props.questions[count];
            return <QuestionCard handleClick={nextQuestion} key={selectedQuestion.id} question={selectedQuestion.question} answers={selectedQuestion.answers} />
        } else if (count < props.questions.length) {
            if (props.questions) {
                let selectedQuestion = props.questions[count]
                return <QuestionCard handleClick={nextQuestion} key={selectedQuestion.id} question={selectedQuestion.question} answers={selectedQuestion.answers} />
            }
        } else {
            renderResult()
            return (
                <ResultCard resetQuiz={resetQuiz} result={text} />
            )
        }
    }

    return (
        <>
            {renderQuestions()}
        </>
    )
}

const msp = state => {
    return {
        messages: state.messages
    }
}

export default connect(msp, null)(Quiz);