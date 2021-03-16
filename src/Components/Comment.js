import React from 'react';
import {connect} from 'react-redux';
import {updateCommentVote, deleteComment} from '../Redux/actions.js';
import styled from 'styled-components';
import UpArrow from '../asset/up_arrow.svg';
import DownArrow from '../asset/down_arrow.svg';

const Comment = props => {
    
    const clickHandle = event => {
        if (event.target.name === 'up') {
            let upVotes = {
                up_votes: props.comment.up_votes + 1
            }
            props.upVoteHandle(upVotes, props.comment.id)
        } else if (event.target.name === 'down') {
            let upVotes = {
                up_votes: props.comment.up_votes - 1
            }
            props.upVoteHandle(upVotes, props.comment.id)
        } else if (event.target.name === 'delete') {
            props.removeComment(props.comment.id)
        }
    }


    return(
        <Container>
            <ButtonContainer>
                <UpVote alt='Up Vote' src={UpArrow} name="up" onClick={clickHandle} />
                <span>{props.comment.up_votes}</span>
                <UpVote alt='Down Vote' src={DownArrow} name="down" onClick={clickHandle} />
            </ButtonContainer>
            <ContentContainer>
                <span style={{ color: 'black', fontSize: '12px', marginLeft: '5px' }}>posted by {props.comment.user.username} on {props.comment.date}</span>
                <p styled={{fonSize: '16px'}}>{props.comment.content}</p>
            </ContentContainer>
            <button name="delete" onClick={clickHandle}>X</button>
        </Container>
    )
}

const mdp = dispatch => {
    return {
        upVoteHandle: (upVoteObj, commentId) => dispatch(updateCommentVote(upVoteObj, commentId)),
        removeComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default connect(null, mdp)(Comment);

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
    width: 80%;
    height: auto;
    box-shadow: 0px 0px 10px grey;
    margin-bottom: 5%;
    padding-top: 2%;
`

const UpVote = styled.img`
    height: 12px;
    width: 17px;
    &:hover {
        cursor: pointer;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5%;
    top: 0%;
    padding-top: 1%;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: auto;
    align-items: flex-start;
    padding-left: 1%;
`

