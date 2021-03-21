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
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload
            break;
        case 'UPDATED_USER':
            let newUsersArray = state.filter(user => user.id !== action.payload.id);
            return [...newUsersArray, action.payload]
            break;
        default:
            return state
            break;
    }
};

function postsReducer(state = defaultState.posts, action) {
    switch (action.type) {
        case 'GET_POSTS':
            return action.payload
            break;
        case 'NEW_POSTS':
            return [...state, action.payload]
            break;
        case 'UPDATED_POST':
            let updatedArray = state.filter(post => post.id !== action.payload.id);
            return [...updatedArray, action.payload] 
            break;
        case 'DELETE':
            debugger
            let newArray = state.filter(post => post.id !== action.payload.id);
            return [...newArray]
            break;
        default:
            return state
            break;
    }
};

function messagesReducer(state = defaultState.messages, action) {
    switch (action.type) {
        case 'GET_MESSAGES':
            return action.payload
            break;
        default:
            return state
            break;
    }
};


function userReducer(state = defaultState.user, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
            break;
        case 'LOGOUT_USER':
            return action.payload
            break;
        case 'UPDATED_USER':
            return action.payload
            break;
        default:
            return state
            break;
    }
};

function favoritesReducer(state = defaultState.favorites, action) {
    switch (action.type) {
        case 'GET_FAVORITES':
            return action.payload
            break;
        case 'NEW_FAVORITE':
            return [...state, action.payload]
            break;
        default:
            return state
            break;
    }
};

function commentsReducer(state = defaultState.comments, action) {
    switch (action.type) {
        case 'GET_COMMENTS':
            return action.payload
            break;
        case 'NEW_COMMENT':
            return [...state, action.payload]
            break;
        case 'UPDATE_COMMENT':
            let filteredCommentsArray = state.filter(comment => comment.id !== action.payload.id);
            return [...filteredCommentsArray, action.payload]
            break;
        case 'DELETE_COMMENT':
            let newCommentsArray = state.filter(comment => comment.id !== action.payload.id);
            return [...newCommentsArray]
            break;
        default:
            return state
            break;
    }
};

function topicsReducer(state = defaultState.topics, action) {
    switch (action.type) {
        case 'GET_TOPICS':
            return action.payload
            break;
        default:
            return state
            break;
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