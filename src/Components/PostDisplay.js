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
        if (title && (content || image)) {
            var today = new Date()
            let formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('user_id', props.user.id);
            formData.append('date', (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear());
            formData.append('image', image);

            props.savePost(formData);
            handleClose();
        } else {
            if (!title) {
                alert('You must include a title')
            } else if (!content || !image) {
                alert('You must include content')
            }
        }

        setTitle("");
        setContent("");
        setImage("");
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
                {props.user ? <Button onClick={handleOpen}>Write Post</Button> : <h4 style={{ textAlign: 'center' }}>Must be logged in to Post or Comment. <br></br><a href="/login">Log-in</a>?</h4>}
            </Header>
            <PostContainer>
                {renderPosts()}
            </PostContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <h1 style={{ color: "#78FF7D" }}>Create a Post</h1>
                        <Label>Title</Label>
                        <Input type='text' value={title} name='title' placeholder='Enter Title' onChange={changeHandle} />
                        <Label>Content</Label>
                        <TextArea name='content' value={content} placeholder='Text (optional)' onChange={changeHandle} />
                        <Label>Choose File</Label>
                        <Input style={{ color: "#78FF7D" }} type='file' name='image' onChange={changeHandle} />
                        <FormButton>Submit</FormButton>
                    </Form>
                </FormContainer>
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

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    background: #333;
`

const Form = styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const Label = styled.label`
    align-self: flex-start;
    margin-bottom: 5px;
    font-weight: bold;
    color: white;
`

const Input = styled.input`
    margin-bottom: 5%;
    width: 100%;
    height: 30px;
`

const TextArea = styled.textarea`
    margin-bottom: 5%;
    width: 100%;
    height: 80px;
    resize: none;
`

const FormButton = styled.button`
    white-space: nowrap;
    width: 110px;
    border-radius: 12px;
    border: #bfa0e2;
    font-weight: 600;
    color: white;
    background-color: #bfa0e2;
    font-size: 14px;
    text-align: center;
    padding: 12px 0px;
    &:hover {
        cursor: pointer;
    }
`

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
    padding-top: 5%;
`

const Button = styled.button`
    white-space: nowrap;
    width: 110px;
    border-radius: 12px;
    border: #bfa0e2;
    font-weight: 600;
    color: white;
    background-color: #bfa0e2;
    font-size: 14px;
    text-align: center;
    padding: 12px 0px;
    &:hover {
        cursor: pointer;
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-bottom: 2%;
`