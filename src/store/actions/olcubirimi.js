

import axios from 'axios';
export const ADD_TO_OLCUBIRIMI='ADD_TO_OLCUBIRIMI';

export const REMOVE_FROM_OLCUBIRIMI='REMOVE_FROM_OLCUBIRIMI';

export const GET_OLCUBIRIMIDATA='GET_OLCUBIRIMIDATA';

export const addToOlcuBirimi = olcubirimi=> async dispatch =>{
    try{
        const res =await axios.post('https://localhost:44312/OlcuBirimi/AddNewOlcuBirimi',olcubirimi);
        
        dispatch({
            type:ADD_TO_OLCUBIRIMI,
            payload:res.data,
            olcubirimi,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_OLCUBIRIMI,
            payload:console.log(e),
            error:true,
            olcubirimi
        })
    }
};

export const removeFromOlcuBirimi= olcubirimi=> async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/OlcuBirimi/DeleteanOlcuBirimi',olcubirimi);
        dispatch({
            type:REMOVE_FROM_OLCUBIRIMI,
            payload:res.data,
            error:false,
            olcubirimi
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_OLCUBIRIMI,
            payload:console.log(e),
            error:true
        })
    }
};

export const getOlcuBirimiData = ()=>async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/OlcuBirimi/GetListofOlcuBirimi`)
        dispatch({
            type:GET_OLCUBIRIMIDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_OLCUBIRIMIDATA,
            payload:console.log(e)
        })
    }
}