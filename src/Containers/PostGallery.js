import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import PostPage from '../Components/PostPage';
import PostDisplay from '../Components/PostDisplay';
import styled from 'styled-components';

const PostGallery = (props) => {

    return (
        <Container>
            <Switch>
                <Route path={'/posts/:id'} render={ (routerProps) => {
                    let id = parseInt(routerProps.match.params.id);
                    
                    if (props.posts.length > 0) {
                        let foundPost = props.posts.find(post => post.id === id)
                        return (<PostPage key={foundPost.id} post={foundPost}/>)
                    }
                }
                } />
                <Route path={'/posts'} render={() => <PostDisplay />}/>
            </Switch>
        </Container>
    )
}

const msp = state => {
    return {
        posts: state.posts
    }
}

export default connect(msp)(PostGallery);

const Container = styled.div`
    font-family: helvetica;
    display: flex;
    flex-direction: column;
    height: auto;
`