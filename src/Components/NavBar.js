import React from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../Redux/actions';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Person from '@material-ui/icons/Person';


function NavBar(props) {

  return (
    <Container>
       <LinkContainer>
          <Tab to="/home"><Logo src='https://uploads-ssl.webflow.com/5e6437bd68556a7f88367dcc/5ec461df6e203d0a9b69f125_logo_new_1.png' alt='logo'/></Tab>
          <Tab to='/quiz' style={{color:"#78FF7D", fontWeight:"bold", textDecoration:"underline"}}>Quiz</Tab>
          <Tab to='/posts'>Community</Tab>
        </LinkContainer>
     
        <IconContainer>
          <Link to={props.user ? "/profile": "/login"}>
            <Icon style={{fontSize: "24pt"}}/>
          </Link>
        </IconContainer>
    </Container>
  )}

  const msp = state => {
    return {
      user: state.user
    }
  }

  const mdp = dispatch => {
    return {
      setUser: (a) => dispatch(loginUser(a))
    }
  }

export default connect(msp, mdp)(NavBar);

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 200px;
  height: 30px;
`
const Icon = styled(Person)`
  color: white;
  margin-right: 50px;
`

const Tab = styled(Link)`
  color: white;
  margin-left: 50px;
  text-decoration: none;
  font-size: 14pt;
  text-transform: uppercase;
  letter-spacing: 3px;
`

const Container = styled.div`
  display: flex;
  background-color: #333;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  align-items: center;
`


