import { GET_ALL_CLASS, GET_RQM, CLASS_ERROR, GET_ALL_USE_CASE, GET_CLASS_BY_ID, GET_USE_CASE_BY_ID,GET_ALL_RQM, COVERTED_RQM } from '../actions/types'

const initialState = {
    class: {},
    useCase: {},
    loading: true,
    singleClass: {},
    singleCase: {},
    rqm:{},
    error: {},
    convertedRqm: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case COVERTED_RQM:
            return{
                ...state,
                loading: false,
                convertedRqm: payload
            }
        case GET_ALL_CLASS:
            return{
                ...state,
                loading: false,
                class: payload
            }
        case GET_CLASS_BY_ID:
            return{
                ...state,
                loading: false,
                singleClass: payload
            }
        case GET_USE_CASE_BY_ID:
            return{
                ...state,
                loading: false,
                singleCase: payload
            }
        case GET_ALL_USE_CASE:
            return{
                ...state,
                loading: false,
                useCase: payload
            }
        case GET_ALL_RQM:
            return{
                ...state,
                loading: false,
                rqm: payload
            }
        case CLASS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}