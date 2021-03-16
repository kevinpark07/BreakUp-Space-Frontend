import React from 'react';
import {connect} from 'react-redux';
import {updateCommentVote, deleteComment} from '../Redux/actions.js';
import styled from 'styled-components';

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
            <LikeContainer>
                <button style={{borderStyle: "none"}} name="up" onClick={clickHandle}>👍</button>
                <span>{props.comment.up_votes}</span>
                <button style={{borderStyle: "none"}} name="down" onClick={clickHandle}>👎</button>
            </LikeContainer>
            <ContentContainer>
                <span style={{ color: 'black', fontSize: '14px', marginLeft: '5px' }}>posted by {props.comment.user.username} on {props.comment.date}</span>
                <h4>{props.comment.content}</h4>
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
    justify-content: space-around;
    margin-top: 2%;
    width: 80%;
    height: auto;
    box-shadow: 0px 0px 10px grey;
    margin-bottom: 5%;
    padding: 2%;
`

const LikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: auto;
    align-items: flex-start;
`