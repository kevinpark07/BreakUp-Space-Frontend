import React from 'react';
import {connect} from 'react-redux';
import {updateCommentVote, deleteComment} from '../Redux/actions.js';
import styled from 'styled-components';
import UpArrow from '../asset/up_arrow.svg';
import DownArrow from '../asset/down_arrow.svg';
import FlagSvg from '../asset/flag.svg';

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
            <ContentContainer>
                <span style={{ color: 'black', fontSize: '12px', fontWeight: 'bold'}}>posted by {props.comment.user.username} on {props.comment.date}</span>
                <p styled={{fonSize: '16px'}}>{props.comment.content}</p>
            <BottomContainer>
                <UpVote alt='Up Vote' src={UpArrow} name="up" onClick={clickHandle} />
                <span style={{margin: '0px 4px'}}>{props.comment.up_votes}</span>
                <UpVote alt='Down Vote' src={DownArrow} name="down" onClick={clickHandle} />
                <a style={{display: 'flex', textDecoration: 'none', color: 'black'}} href={`mailto:info@breakupspace.com?subject=Report Comment ${props.comment.id}&body=Hi, I would like to report this comment due to`}>
                    <FlagIcon src={FlagSvg} alt='flag icon' />
                    <FlagSpan>Report</FlagSpan>
                </a>
            </BottomContainer>
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
    padding: 2% 0%;
`

const UpVote = styled.img`
    height: 15px;
    width: 20px;
    &:hover {
        cursor: pointer;
    }
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: auto;
    align-items: flex-start;
    padding-left: 1%;
`

const FlagIcon = styled.img`
    margin-left: 22px;
    height: 14px;
    &:hover {
        cursor: pointer;
    };
`

const FlagSpan = styled.span`
    display: flex;
    width: 110px;
    align-items: center;
    margin-left: 7px;
    font-weight: bold;
    font-size: 14px;
    &:hover {
        cursor: pointer;
    };
`

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
`