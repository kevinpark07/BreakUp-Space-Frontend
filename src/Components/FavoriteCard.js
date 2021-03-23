import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const FavoriteCard = props => {
    const [message, setMessage] = useState(false)
    const topic = props.topics.find(topic => topic.id === props.message.topic_id)

    const handleClick = () => {
        setMessage(!message);
    }

    return (
        <Div>
            {message ?
                <MessageContainer message={message} onClick={handleClick}>
                    <p>{props.message.message}</p>
                </MessageContainer>
                :
                <ThemeContainer message={message} onClick={handleClick}>
                    <ThemeHeader>{topic.theme}</ThemeHeader>
                </ThemeContainer>}
        </Div>
    )
}

const msp = state => {
    return {
        topics: state.topics
    }
}

export default connect(msp, null)(FavoriteCard);

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MessageContainer = styled.div`
    width: 200px;
    height: 250px;
    margin: 20px;
    border-radius: 20px;
    padding: 0px 15px;
    color: black;
    background: white;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: -10px;
        width: 10px;
        height: 20px;
        background: #333;
        border-bottom-left-radius: 10px;
      }
    &:before {
        content: "";
        position: absolute;
        z-index: 0;
        bottom: 0;
        right: -8px;
        height: 20px;
        width: 20px;
        background: white;
        background-attachment: fixed;
        border-bottom-left-radius: 15px;
    }

`
const ThemeContainer = styled.div`
    display: flex;
    border-radius: 20px 20px 20px 0px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 250px;
    background-color: ${props => props.message ? '#EAEAEA' : '#78ff7d'};
    margin: 20px;
    text-align: center;
    &:hover {
        cursor: pointer;
        color: ${props => props.message ? null : 'white'};;
    }
`

const ThemeHeader = styled.h3`
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    padding-top: 0px;
    padding-right: 30px;
    padding-left: 30px;
`

