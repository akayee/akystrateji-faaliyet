import axios from 'axios';
export const ADD_TO_MEVZUAT='ADD_TO_MEVZUAT';
export const REMOVE_FROM_MEVZUAT='REMOVE_FROM_MEVZUAT';



export const addToMevzuat= mevzuat => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/Mevzuatlar/AddNewMevzuat',mevzuat);
        dispatch({
            type:ADD_TO_MEVZUAT,
            payload:res.data,
            mevzuat,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_MEVZUAT,
            payload:console.log(e),
            error:true,
            mevzuat
        })
    }
;}

export const removeFromMevzuat = mevzuat => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/Mevzuatlar/DeleteaMevzuat',mevzuat);
        
        dispatch({
            type:REMOVE_FROM_MEVZUAT,
            payload:res.data,
            error:false,
            mevzuat
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_MEVZUAT,
            payload:console.log(e),
            error:true
        })
    }
};