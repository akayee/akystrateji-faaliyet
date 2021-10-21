

import axios from 'axios';
export const ADD_TO_HEDEFLER='ADD_TO_HEDEFLER';

export const REMOVE_FROM_HEDEFLER='REMOVE_FROM_HEDEFLER';

export const GET_HEDEFDATA='GET_HEDEFDATA';

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

export const getHdedefData =birimId =>async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Hedefler/GetListofHedefler`)
        dispatch({
            type:GET_HEDEFDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_HEDEFDATA,
            payload:console.log(e)
        })
    }
}