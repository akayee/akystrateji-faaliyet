

import axios from 'axios';
export const ADD_TO_BIRIM='ADD_TO_BIRIM';

export const REMOVE_FROM_BIRIM='REMOVE_FROM_BIRIM';

export const GET_BIRIMDATA = 'GET_BIRIMDATA'



export const addToBirim = birim =>{
    return {type:ADD_TO_BIRIM,birim:birim};
;}

export const removeFromBirim = birimId=>{
    return {type:REMOVE_FROM_BIRIM,bid:birimId}
};

export const getBirimData = birimId =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/Birimler/GetListofBirimler`)
        dispatch({
            type:GET_BIRIMDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_BIRIMDATA,
            payload:console.log(e)
        })
    }
}