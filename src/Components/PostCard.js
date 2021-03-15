import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateVote, deletePost } from '../Redux/actions';
import styled from 'styled-components';
import ChatSvg from '../asset/chat.svg';
import FlagSvg from '../asset/flag.svg';
import UpArrow from '../asset/up_arrow.svg';
import DownArrow from '../asset/down_arrow.svg';
import { Redirect } from 'react-router-dom';

const PostCard = (props) => {

    const [redirect, setRedirect] = useState(false);


    const clickHandle = (event) => {
        if (event.target.name === "up") {
            let upVote = {
                up_votes: props.info.up_votes + 1
            }
            props.updateUpVote(upVote, props.info.id);
        } else if (event.target.name === "down") {
            let downVote = {
                up_votes: props.info.up_votes - 1
            }
            props.updateUpVote(downVote, props.info.id);
        } else if (event.target.name === "delete") {
            props.deletePost(props.info.id);
        } 
    }

    return (
        redirect ? <Redirect to={`/posts/${props.info.id}`} /> :
            <Container>
                <ButtonContainer>
                    <UpVote alt='Up Vote' src={UpArrow} name="up" onClick={clickHandle} />
                    <span style={{ fontWeight: 'bold', fontSize: "15pt", marginTop: '2%', marginBottom: '2%' }}>{props.info.up_votes}</span>
                    <UpVote alt='Down Vote' src={DownArrow} name="down" onClick={clickHandle} />
                </ButtonContainer>
                <PostContainer>
                    <TopContainer>
                        <span style={{ color: 'black', fontSize: '14px', marginLeft: '5px' }}>posted by {props.info.user.username} on {props.info.date}</span>
                        <PostButton name="delete" onClick={clickHandle}>X</PostButton>
                    </TopContainer>
                    <Content onClick={() => setRedirect(true)}>{props.info.content}</Content>
                    {props.info.image ? <Image alt='text' src={props.info.image} /> : null}
                    <BottomContainer>
                        <ChatIcon onClick={() => setRedirect(true)} src={ChatSvg} alt='chat icon' />
                        <Span onClick={() => setRedirect(true)}>{props.info.comments.length} Comments</Span>
                        <FlagIcon src={FlagSvg} alt='flag icon' />
                        <Span>Report</Span>
                    </BottomContainer>
                </PostContainer>
            </Container>
    )
}

const mdp = dispatch => {
    return {
        updateUpVote: (upVote, postId) => dispatch(updateVote(upVote, postId)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(null, mdp)(PostCard);

const Container = styled.div`
    display: flex;
    flex-direction: row; 
    height: auto;
    width: 80%;
    justify-content: center;
    text-decoration: none;
    margin-bottom: 50px;
    padding-top: 2%;
    padding-bottom: 2%;
    box-shadow: 0px 0px 10px grey;
`

const UpVote = styled.img`
    height: 15px;
    width: 20px;
    &:hover {
        cursor: pointer;
    }
`

const PostContainer = styled.div`
    float: right;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 80%;
    height: auto;
    justify-content: space-between;
    padding-left: 2%;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5%;
    top: 0%;
    padding-top: 1%;
`
const PostButton = styled.button`
    postion: static;
    justify-content: center;
    border: none;
    &:hover {
        cursor: pointer;
    }
`

const Image = styled.img`
    height: auto;
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BottomContainer = styled.div`
    display: flex;
    font-size: 14px;
`

const Content = styled.h3`
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 5px;
    color: black;
    font-size: 25px;
    &:hover {
        cursor: pointer;
    }
`

const Span = styled.span`
    display: flex;
    width: 110px;
    align-items: center;
    margin-left: 7px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const ChatIcon = styled.img`
    &:hover {
        cursor: pointer;
    };
`

const FlagIcon = styled.img`
    margin-left: 5px;
    &:hover {
        cursor: pointer;
    };
`