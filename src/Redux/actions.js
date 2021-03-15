const POSTS_URL = 'http://localhost:3000/posts/';
const BREAKUPMESSAGES_URL = 'http://localhost:3000/breakup_messages/';
const USERS_URL = 'http://localhost:3000/users/';
const FAVORITES_URL = 'http://localhost:3000/favorites/';
const COMMENTS_URL = 'http://localhost:3000/comments/';
const TOPICS_URL = 'http://localhost:3000/topics/';


export const getTopics = () => {
    return function (dispatch) {
        fetch(TOPICS_URL)
            .then(resp => resp.json())
            .then(topics => dispatch({ type: "GET_TOPICS", payload: topics }))
    }
}

export const fetchFavorites = () => {
    return function (dispatch) {
        fetch(FAVORITES_URL)
            .then(resp => resp.json())
            .then(favorites => dispatch({ type: "GET_FAVORITES", payload: favorites }))
    }
}

export const getPosts = () => {
    return function (dispatch) {
        fetch(POSTS_URL)
            .then(resp => resp.json())
            .then(posts => dispatch({ type: "GET_POSTS", payload: posts }))
    }
}

export const savePost = (postObj) => {
    return function (dispatch) {
        fetch(POSTS_URL, {
            method: 'POST',
            headers: {
                accepts: "application/json"
            },
            body: postObj
        })
            .then(resp => resp.json())
            .then(newPost => dispatch({ type: "NEW_POST", payload: newPost }))
    }
}

export const editUser = (userId, userObj) => {
    return function (dispatch) {
        fetch(USERS_URL + userId, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify(userObj)
        })
            .then(resp => resp.json())
            .then(updatedUser => dispatch({ type: "UPDATED_USER", payload: updatedUser }))
    }
}

export const deletePost = (postId) => {
    return function (dispatch) {
        fetch(POSTS_URL + postId, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(deletedPost => dispatch({ type: "DELETE_POST", payload: deletedPost }))
    }
}

export const updateVote = (upVote, postId) => {
    return function (dispatch) {
        fetch(POSTS_URL + postId, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify(upVote)
        })
            .then(resp => resp.json())
            .then(updatedPost => dispatch({ type: "UPDATED_POST", payload: updatedPost }))
    }
}

export const getBreakUpMessages = () => {
    return function (dispatch) {
        fetch(BREAKUPMESSAGES_URL)
            .then(resp => resp.json())
            .then(messages => dispatch({ type: "GET_MESSAGES", payload: messages }))
    }
};

export const fetchUsers = () => {
    return function (dispatch) {
        fetch(USERS_URL)
            .then(resp => resp.json())
            .then(users => dispatch({ type: "FETCH_USERS", payload: users }))
    }
}

export const loginUser = user => ({ type: "SET_USER", payload: user });

export const getComments = () => {
    return function (dispatch) {
        fetch(COMMENTS_URL)
            .then(resp => resp.json())
            .then(comments => dispatch({ type: "GET_COMMENTS", payload: comments }))
    }
}

export const saveComment = (commentObj) => {
    return function (dispatch) {
        fetch(COMMENTS_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify(commentObj)
        })
            .then(resp => resp.json())
            .then(comment => dispatch({ type: "NEW_COMMENT", payload: comment }))
    }
}

export const updateCommentVote = (upVoteObj, commentId) => {
    return function (dispatch) {
        fetch(COMMENTS_URL + commentId, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify(upVoteObj)
        })
            .then(resp => resp.json())
            .then(updatedComment => dispatch({ type: "UPDATE_COMMENT", payload: updatedComment }))
    }
}

export const deleteComment = (commentId) => {
    return function (dispatch) {
        fetch(COMMENTS_URL + commentId, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(deletedComment => dispatch({ type: "DELETE_COMMENT", payload: deletedComment }))
    }
}

export const saveFavoriteMessage = (messageObj) => {
    return function (dispatch) {
        fetch(FAVORITES_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify(messageObj)
        })
            .then(resp => resp.json())
            .then(savedFavorite => dispatch({ type: "NEW_FAVORITE", payload: savedFavorite }))
    }
}

export const logoutUser = user => ({ type: "LOGOUT_USER", payload: "" });
