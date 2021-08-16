

import axios from 'axios';
export const ADD_TO_HEDEFLER='ADD_TO_HEDEFLER';

export const REMOVE_FROM_HEDEFLER='REMOVE_FROM_HEDEFLER';

export const GET_HEDEFDATA='GET_HEDEFDATA';

export const addToHedefler = (hedef,amacId)=>{
    return {type:ADD_TO_HEDEFLER,hedef,amacId};
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