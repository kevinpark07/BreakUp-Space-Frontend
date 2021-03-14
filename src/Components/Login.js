import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../Redux/actions';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

    const Login = (props) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const changeHandle = (event) => {
            if (event.target.name === "username") {
                setUsername(event.target.value);
            } else if (event.target.name === "password") {
                setPassword(event.target.value);
            }
        }
        
        const handleSubmit = (event) => {
            event.preventDefault();
            let foundUser = props.users.find(user => user.username === username && user.password === password)
            if (foundUser) {
                props.setUser(foundUser);
            } else {
             return alert('Incorrect Username or Password');
            }
        }

        return (
            <Container>
                {props.user ? <Redirect to='/'/>: null}
                <LoginForm onSubmit={handleSubmit}>
                    <h1 style={{marginBottom: "10px", marginTop: "0%", color: "white"}}>Log In</h1>
                    <span style={{marginBottom: "40px", color: "white"}}>Login here using our username and password</span>
                    <input style={{width: "150px", height: '25px'}} type='text' name='username' placeholder='Username' onChange={changeHandle} />
                    <br/>
                    <input style={{width: "150px", height: '25px'}} type='password' name='password' placeholder='Password' onChange={changeHandle}/>
                    <br></br>
                    <button style={{width: "100px", height: '35px', backgroundColor:'#BFA0E2', color:'white', fontWeight: 'bold'}} >Submit</button>
                </LoginForm>
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
           setUser: (user) => dispatch(loginUser(user))
        }
    }


export default connect (msp, mdp)(Login);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 100%;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 40px;
    padding: 50px; 
    text-align: center;
    background-color: #333;
`