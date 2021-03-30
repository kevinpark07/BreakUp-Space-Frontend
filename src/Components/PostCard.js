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
                    <span style={{ fontWeight: 'bold', fontSize: "15pt", marginTop: '2%', marginBottom: '2%', color: '#333' }}>{props.info.up_votes}</span>
                    <UpVote alt='Down Vote' src={DownArrow} name="down" onClick={clickHandle} />
                </ButtonContainer>
                <PostContainer>
                    <TopContainer>
                        <span style={{ color: '#333', fontSize: '14px', marginLeft: '5px', fontWeight: 'bold' }}>posted by {props.info.user.username} on {props.info.date}</span>
                        <PostButton name="delete" onClick={clickHandle}>X</PostButton>
                    </TopContainer>
                    <span onClick={() => setRedirect(true)} style={{ color: 'white', magrinBottom: '20px', marginTop: '20px', fontWeight: 'bold', fontSize: '20pt' }}>{props.info.title}</span>
                    <Content onClick={() => setRedirect(true)}>{props.info.content}</Content>
                    {props.info.image ? <Image alt='text' src={props.info.image} /> : null}
                    <BottomContainer>
                        <ChatIcon onClick={() => setRedirect(true)} src={ChatSvg} alt='chat icon' />
                        <Span onClick={() => setRedirect(true)}>{props.info.comments.length} Comments</Span>
                        <a style={{ display: 'flex', textDecoration: 'none', color: '#333' }} href={`mailto:info@breakupspace.com?subject=Report Post ${props.info.id}&body=Hi, I would like to report this post due to`}>
                            <FlagIcon src={FlagSvg} alt='flag icon' />
                            <Span>Report</Span>
                        </a>
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

// const Container = styled.div`
//     background-color: #bfa0e2;
//     display: flex;
//     flex-direction: row; 
//     height: auto;
//     width: 80%;
//     justify-content: center;
//     text-decoration: none;
//     margin-bottom: 50px;
//     padding-top: 2%;
//     padding-bottom: 2%;
//     box-shadow: 0px 0px 10px grey;
// `

const Container = styled.div`
height: auto;
width: 70%;
border-radius: 20px;
font-size: 16px;
text-decoration: none;
margin-bottom: 50px;
padding: 2%;
margin-top: 5px;
position: relative;
background-color: #bfa0e2;
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
    background: #eaeaea;
    border-bottom-left-radius: 10px;
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
    display: inline-block;
    text-align: left;
    width: 85%;
    height: auto;
`
const ButtonContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 5%;
    top: 0%;
    padding-top: 1%;
    margin-left: 25px;
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
    margin-top: 5%;
`

const Content = styled.p`
    margin-bottom: 30px;
    margin-top: 10px;
    margin-left: 5px;
    font-size: 14pt;
    color: white;
    &:hover {
        cursor: pointer;
    }
    overflow: auto;
    overflow-wrap: break-word;
`

const Span = styled.span`
    display: flex;
    width: 110px;
    align-items: center;
    margin-left: 7px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
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