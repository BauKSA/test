import { GET_FACILITIES, GET_PRIORITY, GET_JOB_SPOT, HIRIRNG, FACILITIES } from '../actions';

const initialState = {
    facilities: [],
    nurses_id: [],
    job_spot: [],
    hiring: [],
    shifts: []
}

export default function reducer(state = initialState, actions){
    switch(actions.type){
        case GET_FACILITIES:
            return{
                ...state,
                facilities: actions.payload
            }
        case GET_PRIORITY:
            return{
                ...state,
                nurses_id: actions.payload
            }
        case GET_JOB_SPOT:
            return{
                ...state,
                job_spot: actions.payload
            }
        case HIRIRNG:
            return{
                ...state,
                hiring: actions.payload
            }
        case FACILITIES:
            return{
                ...state,
                shifts: actions.payload
            }
        default:
            return state;
    }
}