import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {saveFavoriteMessage} from '../Redux/actions';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ResultCard = (props) => {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);
    const [message, setMessage] = useState(props.result.message);
    const [editMessage, setEditMessage] = useState(false)

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setSave(false);
      };

      const handleSave = () => {
        let messageObj = {
          user_id: props.user.id,
          breakup_message_id: props.result.id,
        };

        props.saveFavoriteMessage(messageObj);
        setSave(true);
        setOpen(true);
      }


      const handleChange = (e) => {
        setMessage(e.target.value);
      }

      const renderResuleHeader = () => {
          if (!props.result.subject) {
            return <Header>The issue is they are more a friend and it seems you want to send a {props.result.tone} text...</Header>
          } else if (!props.result.tone) {
            return <Header>The issue is {props.result.subject}...</Header>
          } else if(props.result.subject === 'they made me feel uncomfortable') {
            return <Header>The issue is they made you feel uncomfortable due to {props.result.tone}...</Header>
          }else {
              return <Header>The issue is {props.result.subject} and it seems you want a {props.result.tone} vibe...</Header>
          }
      }
    
    return (
      <>
        <HeaderContainer>
          {renderResuleHeader()}
          <PTag onClick={props.resetQuiz}>Try Again?</PTag>
        </HeaderContainer>
        <Message edit={editMessage}>
          {editMessage ? <TextArea onChange={handleChange} value={message}/> : <p style={{padding: '2px', margin: '0px'}}>{message}</p>}
        </Message>
        <ButtonContainer user={props.user}>
            {editMessage ?
              <Button onClick={() => setEditMessage(!editMessage)}>Done Editting</Button>
              :
              <Button onClick={() => setEditMessage(!editMessage)}> Edit Text</Button>
            }
            {props.user ? <Button onClick={handleSave}>Save Text</Button> : null}  
            <CopyButton text={message} onCopy={handleOpen}>
                <span>Copy Text!</span>
            </CopyButton>
        </ButtonContainer>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <h5 style={{color: 'white'}}>{save ? 'Saved!' : 'Copied!'}</h5>
        </Modal>       
        </>
    )
}

const msp = state => {
    return {
        messages: state.messages,
        user: state.user
    }
}

const mdp = dispatch => {
  return {
    saveFavoriteMessage: (messageObj) => dispatch(saveFavoriteMessage(messageObj))
  }
}

export default connect(msp, mdp)(ResultCard);

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1.5px solid #a9a9a9;
  margin-bottom: 20px;
`

const PTag = styled.p`
  margin: 0px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #bfa0e2;
  &:hover{
    cursor: pointer;
    color: #9865d0;
  }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: ${props => props.user ? `space-between`: `space-around`}; 
  `

const Button = styled.button`
    white-space: nowrap;
    width: 120px;
    border-radius: 12px;
    border: #bfa0e2;
    font-weight: 600;
    color: white;
    background-color: #333;
    font-size: 14px;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
    }
`

const CopyButton = styled(CopyToClipboard)`
    white-space: nowrap;
    width: 120px;
    border-radius: 12px;
    border: #bfa0e2;
    font-weight: 600;
    color: white;
    background-color: #333;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
    padding: 14px 0px;
    &:hover {
        cursor: pointer;
    }
`

const Header = styled.h1`
    margin-top: 5px;
    font-weight: 600;
    font-size: 16px;
`

const Message = styled.div`
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  margin-left: 25%;
  background-attachment: fixed;
  position: relative;
  margin-bottom: 20px;
  &:before{
      content: "";
      position: absolute;
      z-index: 0;
      bottom: 0;
      right: -8px;
      height: 20px;
      width: 20px;
      background: ${props => props.edit ? `#78ff7d`: `#bfa0e2`};
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
    }
    ${props => props.edit ?
      `background-color: #78ff7d`: `background-color: #bfa0e2`}
`

const TextArea = styled.textarea`
  border: none;
  color: white;
  background: #78ff7d;
  resize: none;
  height: 150px;
  font-family: helvetica;
  font-size: 16px;
  width: 100%;
`