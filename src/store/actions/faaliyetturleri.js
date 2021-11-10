

import axios from 'axios';
export const ADD_TO_FAALIYETTURU='ADD_TO_FAALIYETTURU';

export const REMOVE_FROM_FAALIYETTURU='REMOVE_FROM_FAALIYETTURU';

export const GET_FAALIYETTURU='GET_FAALIYETTURU';

export const addToFaaliyetTuru = (faaliyetturu)=>async dispatch=>{
    try{
        const res =await axios.post(`https://localhost:44312/FaaliyetTurleri/AddNewFaaliyetTuru`,faaliyetturu)
        dispatch({
            type:ADD_TO_FAALIYETTURU,
            payload:res.data,
            faaliyetturu,
            error:false

        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_FAALIYETTURU,
            payload:console.log(e),
            faaliyetturu,
            error:true
        })
    }
};

export const removeFromFaaliyetTuru= faaliyetturu =>{
    
    return {type:REMOVE_FROM_FAALIYETTURU,faaliyetturu}
};

export const getFaaliyetTuruData = ()=> async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/FaaliyetTurleri/GetListofFaaliyetTurleri`)
        dispatch({
            type:GET_FAALIYETTURU,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_FAALIYETTURU,
            payload:console.log(e)
        })
    }
}