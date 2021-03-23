import { React, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createUser } from '../Redux/actions';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const submitHandle = (event) => {
        event.preventDefault();

        if (email === '' || name === '' || username === '' || password === '') {
            alert('One or more fields are empty. All fields except for the profile image must be completed.');
        } else if (props.users.find(user => user.email === email)) {
            alert('There is already an account for this Email.')
            setEmail('');
        } else if (props.users.find(user => user.username === username)) {
            alert('This username is already in use. Please try another username.')
            setUsername('');
        } else if (password !== confirmPassword) {
            alert('Passwords do match. Please Re-enter Password');
            setPassword('');
            setConfirmPassword('');
        } else {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('profile_image', profileImage);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            props.newUser(formData)
        }
    }

    const changeHandle = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'username') {
            setUsername(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        } else if (event.target.name === 'password2') {
            setConfirmPassword(event.target.value);
        } else if (event.target.name === 'profile_image') {
            setProfileImage(event.target.files[0]);
        }
    }


    return (
        <Container>
            {props.user ? <Redirect to={`/profile/${props.user.id}`} /> : null}
            <SignUpForm onSubmit={submitHandle}>
                <h1 style={{ textAlign: 'center', marginBottom: "15px", marginTop: "0%", color: "#78FF7D" }}>Sign Up</h1>
                <Label>Full-Name</Label>
                <Input type='text' value={name} placeholder='Enter Full Name' name='name' onChange={changeHandle} />
                <Label>Email</Label>
                <Input type='text' value={email} placeholder='Enter E-mail' name='email' onChange={changeHandle} />
                <Label>Username</Label>
                <Input type='text' value={username} placeholder='Enter Username' name='username' onChange={changeHandle} />
                <Label>Password</Label>
                <Input type='password' value={password} placeholder='Enter Password' name='password' onChange={changeHandle} />
                <Label>Confirm Password</Label>
                <Input type='password' value={confirmPassword} placeholder='Confirm Password' name='password2' onChange={changeHandle} />
                <Label>Profile Image</Label>
                <input style={{ color: "#78FF7D" }} type='file' name='profile_image' onChange={changeHandle} />
                <Button>Submit</Button>
            </SignUpForm>
        </Container>
    )
}

const msp = state => {
    return {
        users: state.users,
        user: state.user
    }
}

const mdp = dispatch => {
    return {
        newUser: (userInfo) => dispatch(createUser(userInfo))
    }
}

export default connect(msp, mdp)(SignUp);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 40px;
    padding: 40px 60px; 
    text-align: center;
    background-color: #333;
    border-radius: 15px;
`
const Button = styled.button`
    text-align: center;
    height: 40px;
    background-color: #BFA0E2;
    border-color: #BFA0E2;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 120px;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    letter-spacing: 1px;
    &:hover{
        cursor: pointer;
    }
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

