import { 
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
    token: localStorage.getItem('token'),
}

export default function(state=initialState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.jwt)
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            return {...state, token: null, isAuthenticated: false, loading: false}
        default:
            return state
    }
}