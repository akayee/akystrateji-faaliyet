

import axios from 'axios';
export const ADD_TO_BIRIMTIPI='ADD_TO_BIRIMTIPI';

export const REMOVE_FROM_BIRIMTIPI='REMOVE_FROM_BIRIMTIPI';

export const GET_BIRIMTIPIDATA = 'GET_BIRIMTIPIDATA'



export const addToBirimTipi = birimtipi => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/BirimTipleri/AddNewBirimTipi',birimtipi);
        dispatch({
            type:ADD_TO_BIRIMTIPI,
            payload:res.data,
            birimtipi,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_BIRIMTIPI,
            payload:console.log(e),
            error:true,
            birimtipi
        })
    }
;}

export const removeFromBirimTipi = birimTipi => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/BirimTipleri/DeleteaBirimTipi',birimTipi);
        
        dispatch({
            type:REMOVE_FROM_BIRIMTIPI,
            payload:res.data,
            error:false,
            birimTipi
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_BIRIMTIPI,
            payload:console.log(e),
            error:true
        })
    }
};

export const getBirimTipiData = () =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/BirimTipleri/GetListofBirimTipleri`)
        dispatch({
            type:GET_BIRIMTIPIDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_BIRIMTIPIDATA,
            payload:console.log(e)
        })
    }
}