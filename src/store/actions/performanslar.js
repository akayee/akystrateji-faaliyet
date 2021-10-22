

import axios from 'axios';
export const ADD_TO_PERFORMANSLAR='ADD_TO_PERFORMANSLAR';

export const REMOVE_FROM_PERFORMANSLAR='REMOVE_FROM_PERFORMANSLAR';

export const GET_PERFORMANSDATA='GET_PERFORMANSDATA';

export const addToPerformanslar = (performans)=>async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Performanslar/AddNewPerformans`,performans)
        dispatch({
            type:GET_PERFORMANSDATA,
            payload:res.data,
            performans

        })
    }
    catch(e){
        dispatch({
            type:GET_PERFORMANSDATA,
            payload:console.log(e),
            performans
        })
    }
};

export const removeFromPerformanslar= performans =>{
    
    return {type:REMOVE_FROM_PERFORMANSLAR,performans}
};

export const getPerformansData = ()=> async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Performanslar/GetListofPerformanslar`)
        dispatch({
            type:GET_PERFORMANSDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_PERFORMANSDATA,
            payload:console.log(e)
        })
    }
}