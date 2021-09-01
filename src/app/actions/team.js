import axios from 'axios'
import {
    GET_TEAM, CREATE_TEAM, EDIT_TEAM, DELETE_TEAM, ADD_TEAM_MEMBER, TEAM_ERROR
} from './types'

export const getTeam = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://si-user-management.herokuapp.com/regular/teams/user/${id}`)

        dispatch({
            type: GET_TEAM,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: TEAM_ERROR
        })
    }
}