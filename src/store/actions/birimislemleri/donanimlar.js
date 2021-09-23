

import axios from 'axios';
export const ADD_TO_DONANIMLAR='ADD_TO_DONANIMLAR';

export const REMOVE_FROM_DONANIMLAR='REMOVE_FROM_DONANIMLAR';

export const GET_DONANIMDATA = 'GET_DONANIMDATA';
export const UPDATE_FROM_DONANIM= 'UPDATE_FROM_DONANIM';



export const addToDonanim = donanim => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/Donanimlar/AddNewDonanim',donanim);
        dispatch({
            type:ADD_TO_DONANIMLAR,
            payload:res.data,
            donanim,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_DONANIMLAR,
            payload:console.log(e),
            error:true,
            donanim
        })
    }
;}

export const removeFromDonanim = donanim => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/Donanimlar/DeleteaDonanim',donanim);
        
        dispatch({
            type:REMOVE_FROM_DONANIMLAR,
            payload:res.data,
            error:false,
            donanim
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_DONANIMLAR,
            payload:console.log(e),
            error:true
        })
    }
};

export const getDonanimData = (birimId) =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/Donanimlar/GetListofDonanimlar?BirimId=${birimId}`)
        dispatch({
            type:GET_DONANIMDATA,
            payload:res.data,
            error:false
        })
    }
    catch(e){
        dispatch({
            type:GET_DONANIMDATA,
            payload:console.log(e),
            error:true
        })
    }
}

export const updateDonanim = donanim => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/Donanimlar/UpdateaDonanim',donanim);
        dispatch({
            type:UPDATE_FROM_DONANIM,
            payload:res.data,
            error:false,
            donanim
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_DONANIM,
            payload:console.log(e),
            error:true
        })
    }
}