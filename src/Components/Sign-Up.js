import {React, useState} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {createUser} from '../Redux/actions';
import {Redirect} from 'react-router-dom';

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
        <div>
            {props.user ? <Redirect to={`/profile/${props.user.id}`} />: null}
            <form onSubmit={submitHandle}>
                <input type='text' value={name} placeholder='Enter Full Name' name='name' onChange={changeHandle} />
                <input type='text' value={email} placeholder='Enter E-mail' name='email' onChange={changeHandle} />
                <input type='text' value={username} placeholder='Enter Username' name='username' onChange={changeHandle} />
                <input type='password' value={password} placeholder='Enter Password' name='password' onChange={changeHandle} />
                <input type='password' value={confirmPassword} placeholder='Confirm Password' name='password2' onChange={changeHandle} />
                <input type='file' name='profile_image' onChange={changeHandle} />
                <input type='submit' />
            </form>
        </div>
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