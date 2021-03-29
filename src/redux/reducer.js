//initial state values
const initialState = {
    username: '',
    pic: ''
};

//'action type' should be a string that describes what this 
//action is supposed to do. These action type strings are 
//usually stored in a constant outside the function such 
//as const ACTION_TYPE = 'ACTION_TYPE'
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

//action function/builder
export function updateUser(userObject) {
    return { 
        type: LOGIN_USER,
        payload: userObject
    };
};
export function logout() {
    return {
        type:LOGOUT_USER,
    };
};

//reducer function
export default function reducer(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload};
        case LOGOUT_USER:
            return { user: []}
        default:
            return state;
    };
};