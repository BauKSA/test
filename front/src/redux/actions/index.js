import axios from 'axios';

export const GET_FACILITIES = "GET_FACILITIES";
export const GET_PRIORITY = "GET_PRIORITY";
export const GET_JOB_SPOT = "GET_JOB_SPOT";
export const HIRIRNG = "HIRIRNG";
export const FACILITIES = "FACILITIES";

export function get_facilities(){
    return function(dispatch){
        axios.get(`http://localhost:3002/get_facilities`)
        .then((response)=>{
            dispatch({
                type: GET_FACILITIES,
                payload: response.data
            })
        })
    }
}

export function get_hiring_priority(id){
    return function(dispatch){
        axios.get(`http://localhost:3002/get_priority/${id}`)
        .then((response)=>{
            dispatch({
                type: GET_PRIORITY,
                payload: response.data
            })
        })
    }
}

export function get_job_spot(){
    return function(dispatch){
        axios.get(`http://localhost:3002/get_job_spot`)
        .then((response)=>{
            dispatch({
                type: GET_JOB_SPOT,
                payload: response.data
            })
        })
    }
}

export function hiring_posibilities(){
    return function(dispatch){
        axios.get(`http://localhost:3002/hiring_posibilities`)
        .then((response)=>{
            dispatch({
                type: HIRIRNG,
                payload: response.data
            })
        })
    }
}

export function facilities_shifts(){
    return function(dispatch){
        axios.get(`http://localhost:3002/facilities_shifts`)
        .then((response)=>{
            dispatch({
                type: FACILITIES,
                payload: response.data
            })
        })
    }
}