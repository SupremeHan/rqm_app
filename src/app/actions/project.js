import axios from 'axios'
import { GET_PROJECTS, PROJECTS_ERROR } from './types'

export const getProjects = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://si-user-management.herokuapp.com/regular/projects/teams/${id}`)

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROJECTS_ERROR
        })
    }
}