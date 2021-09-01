import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
} from './types'
import setAuthToken from '../libs/setAuthToken'

export const login = (data) => async dispatch => {
    
    try {
        const res = await axios.post('https://si-middleware.herokuapp.com/user-management/login', data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => async dispatch => {  
    dispatch({
        type: LOGOUT
    });
}