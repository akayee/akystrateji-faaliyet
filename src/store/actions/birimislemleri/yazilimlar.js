import axios from 'axios';
export const ADD_TO_YAZILIMLAR='ADD_TO_YAZILIMLAR';

export const REMOVE_FROM_YAZILIMLAR='REMOVE_FROM_YAZILIMLAR';

export const GET_YAZILIMLARDATA = 'GET_YAZILIMLARDATA';
export const UPDATE_FROM_YAZILIM = 'UPDATE_FROM_YAZILIM';



export const addToYazilimlar = yazilim => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/Yazilimlar/AddNewaYazilim',yazilim);
        dispatch({
            type:ADD_TO_YAZILIMLAR,
            payload:res.data,
            yazilim,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_YAZILIMLAR,
            payload:console.log(e),
            error:true,
            yazilim
        })
    }
;}

export const removeFromYazilimlar = yazilim => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/Yazilimlar/DeleteaYazilim',yazilim);
        
        dispatch({
            type:REMOVE_FROM_YAZILIMLAR,
            payload:res.data,
            error:false,
            yazilim
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_YAZILIMLAR,
            payload:console.log(e),
            error:true
        })
    }
};

export const getYazilimlarData = (birimId) =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/Yazilimlar/GetListofYazilimlar?BirimId=${birimId}`)
        dispatch({
            type:GET_YAZILIMLARDATA,
            payload:res.data,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:GET_YAZILIMLARDATA,
            payload:console.log(e),
            error:true
        })
    }
}

export const updateYazilim = yazilim => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/Yazilimlar/UpdateaYazilim',yazilim);
        dispatch({
            type:UPDATE_FROM_YAZILIM,
            payload:res.data,
            error:false,
            yazilim
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_YAZILIM,
            payload:console.log(e),
            error:true
        })
    }
}