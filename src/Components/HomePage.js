import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
    
    const [redirect, setRedirect] = useState(false)

    const clickHandler = () => {
        setRedirect(!redirect)
    }
    
    return(
        <>
            {redirect ? <Redirect to='/quiz'/> : null}
            <Container>
                <TopContainer>
                    <GreetingContainer>
                        <Header>It's time to breakup <br></br>with ghosting.</Header>
                        <Button onClick={clickHandler}>
                        Get Space
                        </Button>
                    </GreetingContainer>
                    <Image alt="ghosting text message" src='https://uploads-ssl.webflow.com/5e6437bd68556a7f88367dcc/5ec296209f679a49aefc57af_Image-32.gif'/>
                </TopContainer>    
            </Container>
            <AboutContainer>
                <BackgroundImage alt='Background About Image' src='https://uploads-ssl.webflow.com/5e6437bd68556a7f88367dcc/5f356e3c22dcee2874868e0d_background.jpg'/>
                <TextContainer>
                    <AboutHeader>
                        Hi, we're BreakUp Space: <br/> The Antithesis of Ghosting.
                    </AboutHeader>
                    <MiddleText>
                        With templated “breakup" texts that make it that <br/> much easier to breakup with ghosting.
                    </MiddleText>
                    <SaveHeartText>
                        Just copy and paste. Save a heart, send a text.
                    </SaveHeartText>  
                </TextContainer>
            </AboutContainer>
          </>  

    )
}

export default HomePage;

const Container = styled.div`
    display: inline-block;
    width: 100%;
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 80vh;  
    background-color: #EAEAEA;
    padding-bottom: 75px;
    padding-top: 75px
`

const GreetingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
   
    width: 35vw;
`

const Header = styled.h1`
    color: #2a2a2a;
    font-size: 40px;
`

const Image = styled.img`
    margin-top: 20px;
    height: 80vh;
`
const Button = styled.button`
    display: inline-block;
    white-space: nowrap;
    min-width: 150px;
    width: 150px;
    border-radius: 12px;
    border: #bfa0e2;
    font-weight: 600;
    color: #2a2a2a;
    background-color: #bfa0e2;
    font-size: 14px;
    margin-top: 20px;
    padding: 15px 36px;
    text-align: center;
    &:hover {
        cursor: pointer;
        color: black;
        filter: brightness(90%);
    }
`
const AboutContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

const BackgroundImage = styled.img`
    z-index: 1;
    width: 100%;
    height: 100%;
    filter: brightness(30%);
`
const AboutHeader = styled.h1`
    color: #2a2a2a;
    color: #fff;
`

const MiddleText = styled.h1`
    color: #2a2a2a;
    color: #fff;
`

const SaveHeartText = styled.h1`
    color: #2a2a2a;
    color: #78FF7D;
`

const TextContainer = styled.div`
    display: grid;
    place-items: center;
    grid-template-rows: auto auto auto auto;
    grid-row-gap: 20px;
    position: absolute;
    align-self: center;
    text-align: center;
    z-index: 1;
    font-size: 14px;
`
