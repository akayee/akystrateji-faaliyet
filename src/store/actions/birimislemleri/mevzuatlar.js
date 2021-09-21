import axios from 'axios';
export const ADD_TO_MEVZUAT='ADD_TO_MEVZUAT';
export const REMOVE_FROM_MEVZUAT='REMOVE_FROM_MEVZUAT';
export const GET_MEVZUATLAR='GET_MEVZUATLAR';
export const UPDATE_FROM_MEVZUATLAR='UPDATE_FROM_MEVZUATLAR';



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

export const getMevzuatlar =  birimId => async dispatch =>{
    try{
        const res = await axios.get(`https://localhost:44312/Mevzuatlar/GetListofMevzuatlar?BirimId=${birimId}`);
        dispatch({
            type:GET_MEVZUATLAR,
            payload:res.data,
            error:false
        })
    }catch(e){
        dispatch({
            type:GET_MEVZUATLAR,
            payload:console.log(e),
            error:true
        })
    }
}
export const updateMevzuat = mevzuat => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/Mevzuatlar/UpdateaMevzuat',mevzuat);
        dispatch({
            type:UPDATE_FROM_MEVZUATLAR,
            payload:res.data,
            error:false,
            mevzuat
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_MEVZUATLAR,
            payload:console.log(e),
            error:true
        })
    }
}