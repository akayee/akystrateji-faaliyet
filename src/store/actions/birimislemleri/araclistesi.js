import axios from 'axios';
export const ADD_TO_ARACLAR='ADD_TO_ARACLAR';
export const REMOVE_FROM_ARACLAR='REMOVE_FROM_ARACLAR';
export const GET_ARACLARDATA = 'GET_ARACLARDATA';
export const UPDATE_FROM_ARACLAR='UPDATE_FROM_ARACLAR';


export const addToAraclar = arac => async dispatch=>{

    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/Araclar/AddNewArac',arac);
        dispatch({
            type:ADD_TO_ARACLAR,
            payload:res.data,
            arac,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_ARACLAR,
            payload:console.log(e),
            error:true,
            arac
        })
    }
;}

export const removeFromAraclar = arac => async dispatch=>{
    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/Araclar/DeleteanArac',arac);
        
        dispatch({
            type:REMOVE_FROM_ARACLAR,
            payload:res.data,
            error:false,
            arac
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_ARACLAR,
            payload:console.log(e),
            error:true
        })
    }
};

export const getAraclarData = birimId =>async dispatch=> {
    try{
        //TODO linki kontrol et
        const res =await axios.get(`https://localhost:44312/Araclar/GetListofAraclar?BirimId=${birimId}`)
        dispatch({
            type:GET_ARACLARDATA,
            payload:res.data,
            error:false
        })
    }
    catch(e){
        dispatch({
            type:GET_ARACLARDATA,
            payload:console.log(e),
            error:true
        })
    }
}

export const updateAraclar = arac => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/Araclar/UpdateanArac',arac);
        dispatch({
            type:UPDATE_FROM_ARACLAR,
            payload:res.data,
            error:false,
            arac
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_ARACLAR,
            payload:console.log(e),
            error:true
        })
    }
}