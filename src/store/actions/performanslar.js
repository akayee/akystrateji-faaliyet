

import axios from 'axios';
export const ADD_TO_PERFORMANSLAR='ADD_TO_PERFORMANSLAR';

export const REMOVE_FROM_PERFORMANSLAR='REMOVE_FROM_PERFORMANSLAR';

export const GET_PERFORMANSDATA='GET_PERFORMANSDATA';

export const addToPerformanslar = (performans)=>async dispatch=>{
    try{
        const res =await axios.post(`https://localhost:44312/Performanslar/AddNewPerformans`,performans)
        dispatch({
            type:ADD_TO_PERFORMANSLAR,
            payload:res.data,
            performans,
            error:false

        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_PERFORMANSLAR,
            payload:console.log(e),
            performans,
            error:true
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