import React, { useState } from 'react';
import { connect } from 'react-redux';
import FavoritesContainer from '../Containers/FavoritesContainer';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { editUser, logoutUser } from '../Redux/actions';
import { Redirect } from 'react-router-dom';

const status = [
    {
        value: 'single',
        label: 'single',
    },
    {
        value: 'taken',
        label: 'taken',
    },
    {
        value: 'complicated',
        label: 'complicated',
    },
    {
        value: 'serious',
        label: 'serious',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

const UserProfile = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [relationship, setRelationship] = useState(props.user.relationship_status);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState(props.user.password);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState(props.user.username);

    const handleChange = (e) => {
        if (e.target.name === 'relationship') {
            setRelationship(e.target.value);
        } else if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'password confirmation') {
            setPasswordConfirmation(e.target.value)
        } else if (e.target.name === 'username') {
            setUsername(e.target.value)
        } else if (e.target.name === 'logout') {
            props.logoutUser();
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirmation) {
            return alert('Passwords do not match');
        } else {
            let userData = {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                username: e.target.username.value,
                relationship_status: e.target.relationship.value,
            }
            props.editUser(props.user.id, userData);
            handleClose();
        }

    }

    return (
        props.user ?
            <Container>
                <DataContainer>
                    <ProfileImage alt="profile_image" src={props.user.profile_image} />
                    <ProfileContainer>
                        <UsernameTitle>{props.user.username}</UsernameTitle>
                        <button onClick={handleChange} name='logout'>Log Out</button>
                        <ProfileButton onClick={handleOpen}>Edit Profile</ProfileButton>
                    </ProfileContainer>
                </DataContainer>
                <ProfileModal
                    open={open}
                    onClose={handleClose}
                >
                    <div className={classes.root} noValidate autoComplete="off">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="outlined-full-width"
                                label="Name"
                                style={{ margin: 8 }}
                                //placeholder={props.user.name}
                                //value={relationship}
                                name="name"
                                onChange={handleChange}
                                value={name}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-full-width"
                                label="Email"
                                style={{ margin: 8 }}
                                placeholder={props.user.email}
                                fullWidth
                                name="email"
                                onChange={handleChange}
                                value={email}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                id="outlined-margin-normal"
                                defaultValue='Enter New Password'
                                className={classes.textField}
                                name="password"
                                onChange={handleChange}
                                value={password}
                                helperText="no caps please"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Password Confirmation"
                                name="password confirmation"
                                onChange={handleChange}
                                value={passwordConfirmation}
                                id="outlined-margin-normal"
                                defaultValue='Confirm Password'
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Username"
                                name="username"
                                onChange={handleChange}
                                value={username}
                                id="outlined-margin-normal"
                                defaultValue={props.user.username}
                                className={classes.textField}
                                helperText="Keep it short and sweet 🍭"
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-margin-normal"
                                className={classes.textField}
                                select
                                label="Relationship Status"
                                name='relationship'
                                value={relationship}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            >
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <button>Submit</button>
                        </form>
                    </div>
                </ProfileModal>

                <TextContainer>
                    <FavoritesContainer />
                </TextContainer>
            </Container>
            :
            <Redirect to='/login' />
    )
}

const msp = state => {
    return {
        user: state.user
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
    width: 70%;
`

const UsernameTitle = styled.h3`
    margin: 0px;
`

const ProfileButton = styled.button`
    color: #bfa0e2;
    background-color: white;
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
        color: white;
        background-color: #bfa0e2;
    }
`
const ProfileImage = styled.img``

const DataContainer = styled.div`
    display: flex;
    width: 70%;
    margin: 20px;
    padding: 20px 15px;
    border-radius: 4px;
`

const TextContainer = styled(DataContainer)`
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
`

const ProfileModal = styled(Modal)`
    background-color: white;
    width: 60%;
    height: 50%;
    outline: 0;
    
`