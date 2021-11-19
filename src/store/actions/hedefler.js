

import axios from 'axios';
export const ADD_TO_HEDEFLER='ADD_TO_HEDEFLER';
export const REMOVE_FROM_HEDEFLER='REMOVE_FROM_HEDEFLER';
export const GET_HEDEFDATA='GET_HEDEFDATA';
export const UPDATE_FROM_HEDEFLER='UPDATE_FROM_HEDEFLER'


export const addToHedefler = (hedef)=>async dispatch=>{
    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/Hedefler/AddNewHedef',hedef);
        dispatch({
            type:ADD_TO_HEDEFLER,
            payload:res.data,
            hedef,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_HEDEFLER,
            payload:console.log(e),
            error:true,
            hedef
        })
    }
};

export const removeFromHedefler= hedef =>{
    
    return {type:REMOVE_FROM_HEDEFLER,hedef}
};

export const updateHedef =(hedef) =>async dispatch=>{
    try{
        const res =await axios.post(`https://localhost:44312/Hedefler/UpdateaHedef`,hedef)
        dispatch({
            type:UPDATE_FROM_HEDEFLER,
            payload:res.data,
            error:false,
            hedef
        })
    }
    catch(e){
        dispatch({
            type:UPDATE_FROM_HEDEFLER,
            payload:console.log(e),
            error:true
        })
    }
}

export const getHdedefData =() =>async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Hedefler/GetListofHedefler`)
        dispatch({
            type:GET_HEDEFDATA,
            payload:res.data,
            error:false
        })
    }
    catch(e){
        dispatch({
            type:GET_HEDEFDATA,
            payload:console.log(e),
            error:true
        })
    }
}