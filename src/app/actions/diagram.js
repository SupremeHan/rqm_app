import axios from 'axios'
import { GET_ALL_CLASS, GET_ALL_USE_CASE, GET_RQM, CLASS_ERROR, GET_CLASS_BY_ID, GET_USE_CASE_BY_ID ,GET_ALL_RQM, COVERTED_RQM } from './types'

export const getAllClass = (projectId) => async dispatch => {
    try {
        const res = await axios.get(`https://si-class.herokuapp.com/regular/all/${projectId}`)

        dispatch({
            type: GET_ALL_CLASS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}

export const getClassById = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://si-class.herokuapp.com/regular/project/${id}`)

        dispatch({
            type: GET_CLASS_BY_ID,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}

export const getAllUseCase = (projectId) => async dispatch => {
    try {
        const res = await axios.get(`https://si-use-case.herokuapp.com/regular/all/${projectId}`)

        dispatch({
            type: GET_ALL_USE_CASE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}

export const getUseCaseById = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://si-use-case.herokuapp.com/regular/project/${id}`)

        dispatch({
            type: GET_USE_CASE_BY_ID,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}

export const getAllRqm = (projectId) => async dispatch => {
    try {
        const res = await axios.get(`https://si-rqm.herokuapp.com/regular/all/${projectId}`)

        dispatch({
            type: GET_ALL_RQM,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}


export const convertedRqm = (data) => async dispatch => {
    try {
    //    const res = {"id":"60b284632aa001496ccf41cf","title":"Moj neki Use Case", "projectId":1, "class": "GraphLinksModel",
       //               "linkKeyProperty": "key",
     //                 "nodeDataArray": [
     //               {"text":"asdasdasdasd","category":"UseCase","key":-1,"loc":"-171.484375 -105"},
     //               {"text":"asdasd","category":"UseCase","key":-2,"loc":"-80.484375 186"},
     //               {"text":"werwerwer","category":"UseCase","key":-3,"loc":"125.515625 -31"}
    //                ],
     //                 "linkDataArray": [
    //                {"category":"include","from":-1,"to":-2,"key":-1},
    //                {"category":"gen","from":-3,"to":-2,"key":-2}
    //                ]}

        const res = await axios.post('https://si-rqm-to-use-case.herokuapp.com/team-leader/rqm-to-use-case/',data)

        console.log(res)
        dispatch({
            type: COVERTED_RQM,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: CLASS_ERROR
        })
    }
}