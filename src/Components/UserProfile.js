import React, { useState } from 'react';
import { connect } from 'react-redux';
import FavoritesContainer from '../Containers/FavoritesContainer';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { editUser, logoutUser } from '../Redux/actions';
import { Redirect } from 'react-router-dom';

const UserProfile = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState(props.user.username);
    const [profileImg, setProfileImg] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const changeHandle = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'password2') {
            setPasswordConfirmation(e.target.value)
        } else if (e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'logout') {
            props.logoutUser();
        } else if (e.target.name === 'profile_image') {
            setProfileImg(e.target.files[0]);
        } else if (e.target.name === 'currentPassword') {
            setCurrentPassword(e.target.value);
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            alert('Passwords do match. Please Re-enter Password');
            setPassword('');
            setPasswordConfirmation('');
        } else if (username !== props.user.username) {
            if (props.users.find(user => user.username === username)) {
                alert('Username already exists')
            } else {
                if (password === '') {
                    let formData = new FormData();
                    formData.append('name', name);
                    formData.append('username', username);
                    formData.append('profile_image', profileImg);
                    formData.append('email', email);
                    formData.append('username', username);
                    formData.append('password', props.user.password);
                    props.editUser(props.user.id, formData);
                    handleClose();
                } else {
                    let formData = new FormData();
                    formData.append('name', name);
                    formData.append('username', username);
                    formData.append('profile_image', profileImg);
                    formData.append('email', email);
                    formData.append('username', username);
                    formData.append('password', password);
                    props.editUser(props.user.id, formData);
                    handleClose();
                }
            }
        } else if (email !== props.user.email) {
            if (props.users.find(user => user.email === email)) {
                alert('Email already in use')
            } else {
                if (password === '') {
                    let formData = new FormData();
                    formData.append('name', name);
                    formData.append('username', username);
                    formData.append('profile_image', profileImg);
                    formData.append('email', email);
                    formData.append('username', username);
                    formData.append('password', props.user.password);
                    props.editUser(props.user.id, formData);
                    handleClose();
                } else {
                    let formData = new FormData();
                    formData.append('name', name);
                    formData.append('username', username);
                    formData.append('profile_image', profileImg);
                    formData.append('email', email);
                    formData.append('username', username);
                    formData.append('password', password);
                    props.editUser(props.user.id, formData);
                    handleClose();
                }
            }
        } else if (currentPassword !== props.user.password) {
            alert('Password to confirm changes does not match. Please re-enter current Password');
            setCurrentPassword('');
        } else if (password === '') {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('profile_image', profileImg);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', props.user.password);
            props.editUser(props.user.id, formData);
            handleClose();
        } else {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('profile_image', profileImg);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            props.editUser(props.user.id, formData);
            handleClose();
        }
        setPassword('');
        setPasswordConfirmation('');
        setCurrentPassword('');
    }

    return (
        props.user ?
            <Container>
                <DataContainer>
                    <ProfileImage alt="profile_image" src={props.user.profile_image} />
                    <ProfileContainer>
                        <UsernameTitle>{props.user.username}</UsernameTitle>
                        <ButtonContainer>
                            <Button style={{ marginRight: "20px" }} onClick={changeHandle} name='logout'>Log Out</Button>
                            <Button onClick={handleOpen}>Edit Profile</Button>
                        </ButtonContainer>
                    </ProfileContainer>
                </DataContainer>
                <TextContainer>
                    <FavoritesContainer />
                </TextContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <FormContainer>
                        <Form onSubmit={handleSubmit}>
                            <h1 style={{ textAlign: 'center', marginBottom: "15px", marginTop: "0%", color: "#78FF7D" }}>Edit Profile</h1>
                            <Label>Full-Name</Label>
                            <Input type='text' value={name} name='name' onChange={changeHandle} />
                            <Label>Email</Label>
                            <Input type='text' value={email} name='email' onChange={changeHandle} />
                            <Label>Username</Label>
                            <Input type='text' value={username} name='username' onChange={changeHandle} />
                            <Label>New Password</Label>
                            <Input type='password' value={password} name='password' onChange={changeHandle} />
                            <Label>Confirm New Password</Label>
                            <Input type='password' value={passwordConfirmation} name='password2' onChange={changeHandle} />
                            <Label>Profile Image</Label>
                            <input style={{ color: "#78FF7D", marginBottom: "25px" }} type='file' name='profile_image' onChange={changeHandle} />
                            <Input type='password' value={currentPassword} name='currentPassword' placeholder='Enter old password to confirm changes' onChange={changeHandle} />
                            <Button>Submit</Button>
                        </Form>
                    </FormContainer>
                </Modal>
            </Container >
            :
            <Redirect to='/login' />
    )
}

const msp = state => {
    return {
        user: state.user,
        users: state.users
    }
}

const mdp = dispatch => {
    return {
        editUser: (userId, userObj) => dispatch(editUser(userId, userObj)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(msp, mdp)(UserProfile);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EAEAEA;
`

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
`
const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    margin: 50px;
`

const UsernameTitle = styled.h3`
    margin-right: 20px;

`
const ButtonContainer = styled.div`
    display: flex; 
    flex-direction: row;
`

const Button = styled.button`
    color: white;
    background-color: #bfa0e2;
    text-transform: uppercase;
    width: 8vw;
    height: 32px;
    letter-spacing: 0.7px;
    border-radius: 16px;
    border: 1px solid #bfa0e2;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    margin-top: 10px;
    align-items: center;
    min-width: 120px;
    padding: 0px 12px 2px;
    &:hover {
        cursor: pointer;
        color: black;
    }
`
const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border: solid black;
    border-radius: 50%;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    margin: 20px;
    border-radius: 4px;
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background-color: #333;
`

const Label = styled.label`
    align-self: flex-start;
    margin-bottom: 5px;
    color: white;
`

const Input = styled.input`
    width: 100%;
    margin-bottom: 18px;
    height: 25px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 40px;
    text-align: center;
    background-color: #333;
    border-radius: 15px;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: auto;
    background: #333;
`