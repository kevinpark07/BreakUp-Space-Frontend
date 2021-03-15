import React, { useState } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { saveComment } from '../Redux/actions';
import styled from 'styled-components';

function PostPage({ post, user, saveComment, comments }) {

    const [comment, setComment] = useState("")

    const renderComments = () => {
        let postComments = comments.filter(comment => comment.post.id === post.id)
        return postComments.map(comment => <Comment key={comment.id} comment={comment} />)
    }

    const submitHandle = event => {
        event.preventDefault();
        var today = new Date();
        let savedPost = {
            content: comment,
            post_id: post.id,
            user_id: user.id,
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ".000Z",
            // add up-vote
        }
        saveComment(savedPost);
        setComment("");
    }

    const changeHandle = (event) => {
        if (event.target.name === 'comment') {
            setComment(event.target.value);
        }
    }

    return (
        <Container>
            <PostContainer>
                <h1>Title: {post.title}</h1>
                <h3>Date: {post.date}</h3>
                <h3>Time: {post.time}</h3>
                <h3>Username: {post.user.username}</h3>
                <p>Post: {post.content}</p>
            </PostContainer>

            <form onSubmit={submitHandle}>
                <input placeholder='Enter Comment here' name='comment' onChange={changeHandle} />
                <button>Submit</button>
            </form>
            {renderComments()}
        </Container>
    )
}

const msp = state => {
    return {
        user: state.user
        ,
        comments: state.comments
    }
}

const mdp = dispatch => {
    return {
        saveComment: (commentObj) => dispatch(saveComment(commentObj)),
    }
}

export default connect(msp, mdp)(PostPage);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
`

const PostContainer= styled.div`
    float: right;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 80%;
    height: auto;
    justify-content: space-between;
    padding-left: 2%;
`