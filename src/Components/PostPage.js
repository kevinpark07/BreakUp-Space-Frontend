import React, { useState } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { saveComment, updateVote } from '../Redux/actions';
import styled from 'styled-components';
import ChatSvg from '../asset/chat.svg';
import FlagSvg from '../asset/flag.svg';
import UpArrow from '../asset/up_arrow.svg';
import DownArrow from '../asset/down_arrow.svg';

function PostPage({ post, user, saveComment, comments, updateVote }) {

    const [comment, setComment] = useState("")

    const renderComments = () => {
        let postComments = comments.filter(comment => comment.post.id === post.id)
        let sortedComments = postComments.sort((a,b) => b.up_votes - a.up_votes);
        return sortedComments.map(comment => <Comment key={comment.id} comment={comment} />)
    }

    const submitHandle = event => {
        event.preventDefault();
        var today = new Date();
        let savedPost = {
            content: comment,
            post_id: post.id,
            user_id: user.id,
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            up_votes: 0,
        }
        saveComment(savedPost);
        setComment("");
    }

    const changeHandle = (event) => {
        if (event.target.name === 'comment') {
            setComment(event.target.value);
        } else if (event.target.name === 'up') {
            let upVote = {
                up_votes: post.up_votes + 1
            }
            updateVote(upVote, post.id);
        } else if (event.target.name === "down") {
            let downVote = {
                up_votes: post.up_votes - 1
            }
            updateVote(downVote, post.id);
        } 
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>    
            <Container>
                <VoteContainer>
                    <UpVote alt='Up Vote' src={UpArrow} name="up" onClick={changeHandle} />
                    <span>{post.up_votes}</span>
                    <UpVote alt='Down Vote' src={DownArrow} name="down" onClick={changeHandle} />
                </VoteContainer>
                <InnerContainer>
                    <PostContainer>
                        <ContentContainer>
                            <span style={{ color: 'black', fontSize: '14px', marginLeft: '5px' }}>posted by {post.user.username} on {post.date}</span>
                            <Content>{post.content}</Content>
                            {post.image ? <Image alt='text' src={post.image} /> : null}
                            <BottomContainer>
                                <ChatIcon  src={ChatSvg} alt='chat icon' />
                                <Span >{post.comments.length} Comments</Span>
                                <FlagIcon src={FlagSvg} alt='flag icon' />
                                <FlagSpan>Report</FlagSpan>
                            </BottomContainer>
                        </ContentContainer>  
                    </PostContainer>
                    {user ? 
                    <Form onSubmit={submitHandle}>
                        <CommentInput placeholder='Enter Comment here' name='comment' onChange={changeHandle} value={comment}/>
                        <br></br>
                        <button style={{marginTop: "2%"}}>Submit</button>
                    </Form>
                    :
                    <h4>Must be logged in to Comment. <br></br><a href="/login">Log-in</a>?</h4> }
                    {renderComments()}
                </InnerContainer>
            </Container>
        </div>
    )
}

const msp = state => {
    return {
        user: state.user,
        comments: state.comments
    }
}

const mdp = dispatch => {
    return {
        saveComment: (commentObj) => dispatch(saveComment(commentObj)),
        updateVote: (upVote, postId) => dispatch(updateVote(upVote, postId))
    }
}

export default connect(msp, mdp)(PostPage);

const Form = styled.form`
    margin-top: 2%;
    width: 80%;
    height: auto;
    text-align: center;
    padding: 2%;
`

const CommentInput = styled.textarea`
    height: 80px;
    width: 100%;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: auto;
    overflow: auto;
    padding: 2% 0%;
    margin-top: 2%;
    justify-content: center;
    box-shadow: 0px 0px 10px grey;
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 80%;
    overflow: auto;
    align-items: center;
    background-color: #EAEAEA
`

const PostContainer= styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: auto;
    align-self: flex-start;
    justify-content: space-between;
    padding-top: 1%;
    padding-left: 2%;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
`

const VoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1%;
    padding-left: 2%;
    background-color: #EAEAEA;
`

const UpVote = styled.img`
    height: 15px;
    width: 20px;
    &:hover {
        cursor: pointer;
    }
    margin-top: 5%;
    margin-bottom: 5%;
`

const Content = styled.h4`
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 5px;
    color: black;
    font-size: 18pt;
    overflow: auto;
    overflow-wrap: break-word;
`

const Image = styled.img`
    height: auto;
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`

const BottomContainer = styled.div`
    display: flex;
    font-size: 14px;
`

const ChatIcon = styled.img`
`

const FlagIcon = styled.img`
    margin-left: 5px;
    &:hover {
        cursor: pointer;
    };
`

const Span = styled.span`
    display: flex;
    width: 110px;
    align-items: center;
    margin-left: 7px;
    font-weight: bold;
`

const FlagSpan = styled(Span)`
    &:hover {
        cursor: pointer;
    };
`