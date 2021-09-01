import { GET_PROJECTS, PROJECTS_ERROR } from '../actions/types'

const initialState = {
    projects: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_PROJECTS:
            return{
                ...state,
                loading: false,
                projects: payload
            }
        case PROJECTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}