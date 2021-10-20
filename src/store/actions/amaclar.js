

import axios from 'axios';
export const ADD_TO_AMACLAR='ADD_TO_AMACLAR';
export const REMOVE_FROM_AMACLAR='REMOVE_FROM_AMACLAR';
export const GET_AMACDATA='GET_AMACDATA';
export const UPDATE_FROM_AMACLAR='UPDATE_FROM_AMACLAR'

export const addToAmaclar = amac => async dispatch=>{
    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/Amaclar/AddNewAmac',amac);
        dispatch({
            type:ADD_TO_AMACLAR,
            payload:res.data,
            amac,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_AMACLAR,
            payload:console.log(e),
            error:true,
            amac
        })
    }
};

export const removeFromAmaclar= amac=>{
    return {type:REMOVE_FROM_AMACLAR,amac}
};

export const getAmacData = yil=>async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Amaclar/GetListofAmaclar`,)
        const resStra =await axios.get(`https://localhost:44312/Amaclar/GetListOfTumStrateji`,)
        dispatch({
            type:GET_AMACDATA,
            payload:res.data,
            error:false,
            stratejidata:resStra.data
        })
    }
    catch(e){
        dispatch({
            type:GET_AMACDATA,
            payload:console.log(e),
            error:true
        })
    }
}
export const updateAmac =  amac => async dispatch =>{
    try{
        const res = await axios.post(`https://localhost:44312/Amaclar/UpdateAnAmac`,amac);
        dispatch({
            type:UPDATE_FROM_AMACLAR,
            payload:res.data,
            error:false,
            amac
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_AMACLAR,
            payload:console.log(e),
            error:true
        })
    }
}