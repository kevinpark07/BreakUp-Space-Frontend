import React, { useState } from 'react';
import PostCard from '../Components/PostCard';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { savePost } from '../Redux/actions';
import styled from 'styled-components';

const PostDisplay = props => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const renderPosts = () => {
        let sortedPosts = props.posts.sort((a, b) => b.up_votes - a.up_votes)
        return sortedPosts.map(post => <PostCard key={post.id} info={post} />)
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var today = new Date()
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('user_id', props.user.id);
        formData.append('date', (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear());
        formData.append('image', image);

        props.savePost(formData);
        setOpen(false);
    }

    const changeHandle = (event) => {
        if (event.target.name === 'title') {
            setTitle(event.target.value)
        } else if (event.target.name === 'content') {
            setContent(event.target.value)
        } else if (event.target.name === 'image') {
            setImage(event.target.files[0])
        }
    }

    return (
        <Container>
            <Header>
                <h1>Community Board</h1>
                {props.user ? <Button onClick={handleOpen}>Write Post</Button> : <h4>Must be logged in to Post or Comment. <br></br><a href="/login">Log-in</a>?</h4>}
            </Header>
            <PostContainer>
                {renderPosts()}
            </PostContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' name='title' placeholder='title goes here!' onChange={changeHandle} />
                        <input type='textarea' name='content' placeholder='text goes here!' onChange={changeHandle} />
                        <input type='file' name='image' onChange={changeHandle} />
                        <button>Submit</button>
                    </form>
                </div>
            </Modal>
        </Container>
    )
}

const msp = state => {
    return {
        posts: state.posts,
        user: state.user
    }
}

const mdp = dispatch => {
    return {
        savePost: (postObj) => dispatch(savePost(postObj))
    }
}

export default connect(msp, mdp)(PostDisplay);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
`
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    overflow: auto;
    border: solid purple;
    padding-top: 5%;
`

const Button = styled.button`
    width: 150px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-bottom: 2%;
    border: solid orange;
`