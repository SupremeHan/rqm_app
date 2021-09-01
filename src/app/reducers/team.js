import {
    GET_TEAM, CREATE_TEAM, EDIT_TEAM, DELETE_TEAM, ADD_TEAM_MEMBER, TEAM_ERROR
} from '../actions/types'

const initialState = {
    teams: [],
    loading: true,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_TEAM:
            return{
                ...state,
                loading: false,
                teams: payload
            }
        default:
            return state
    }
}