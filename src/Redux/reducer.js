import {combineReducers} from 'redux';

let defaultState = {
    posts: [],
    messages: [],
    users: [],
    user: '',
    favorites: [],
    comments: [],
    topics: [],
};

function usersReducer(state = defaultState.users, action) {
    if (action.type === 'FETCH_USERS') {
        return action.payload;
    } else if (action.type === 'UPDATED_USER') {
        let newUsersArray = state.filter(user => user.id !== action.payload.id);
        return [...newUsersArray, action.payload];
    } else {
        return state;
    }
};

function postsReducer(state = defaultState.posts, action) {
    if (action.type === 'GET_POSTS') {
        return action.payload
    } else if (action.type === 'NEW_POST') {
        return [...state, action.payload]
    } else if (action.type === 'UPDATED_POST') {
        let updatedArray = state.filter(post => post.id !== action.payload.id);
        return [...updatedArray, action.payload] 
    } else if (action.type === 'DELETE_POST') {
        let newArray = state.filter(post => post.id !== action.payload.id);
        return [...newArray]
    } else {
        return state;
    }
};

function messagesReducer(state = defaultState.messages, action) {
    if (action.type === 'GET_MESSAGES') {
        return action.payload
    } else {
        return state;
    }
};


function userReducer(state = defaultState.user, action) {
    if (action.type === 'SET_USER') {
        return action.payload
    } else if (action.type === 'LOGOUT_USER') {
        return action.payload
    } else if (action.type === 'UPDATED_USER') {
        return action.payload
    } else {
        return state;
    }
};

function favoritesReducer(state = defaultState.favorites, action) {
    if (action.type === 'GET_FAVORITES') {
        return action.payload
    } else if (action.type === 'NEW_FAVORITE') {
        return [...state, action.payload]
    } else {
        return state;
    }
};

function commentsReducer(state = defaultState.comments, action) {
    if (action.type === 'GET_COMMENTS') {
        return action.payload
    } else if (action.type === 'NEW_COMMENT') {
        return [...state, action.payload]
    } else if (action.type === 'UPDATE_COMMENT') {
        let filteredCommentsArray = state.filter(comment => comment.id !== action.payload.id);
        return [...filteredCommentsArray, action.payload]
    } else if (action.type === 'DELETE_COMMENT') {
        let newCommentsArray = state.filter(comment => comment.id !== action.payload.id);
        return newCommentsArray
    } else {
        return state;
    }
};

function topicsReducer(state = defaultState.topics, action) {
    if (action.type === 'GET_TOPICS') {
        return action.payload
    } else {
        return state;
    }
};

let rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    messages: messagesReducer,
    user: userReducer,
    favorites: favoritesReducer,
    comments: commentsReducer,
    topics: topicsReducer,
});

export default rootReducer;