import axios from 'axios';
export const ADD_TO_PERSONELLER='ADD_TO_PERSONELLER';
export const REMOVE_FROM_PERSONELLER='REMOVE_FROM_PERSONELLER';
export const GET_PERSONELLERDATA = 'GET_PERSONELLERDATA';
export const UPDATE_FROM_PERSONELLER='UPDATE_FROM_PERSONELLER';



export const addToPersoneller = personel => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/Personel/AddNewPersonel',personel);
        dispatch({
            type:ADD_TO_PERSONELLER,
            payload:res.data,
            personel,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_PERSONELLER,
            payload:console.log(e),
            error:true,
            personel
        })
    }
;}

export const removeFromPersoneller = personel => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/Personel/DeleteaPersoneller',personel);
        
        dispatch({
            type:REMOVE_FROM_PERSONELLER,
            payload:res.data,
            error:false,
            personel
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_PERSONELLER,
            payload:console.log(e),
            error:true
        })
    }
};

export const getPersonelData = birimId =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/Personel/GetListofPersoneller?BirimId=${birimId}`)
        dispatch({
            type:GET_PERSONELLERDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_PERSONELLERDATA,
            payload:console.log(e)
        })
    }
}

export const updatePersonelData = personel => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/Personel/UpdateaPersonel',personel);
        dispatch({
            type:UPDATE_FROM_PERSONELLER,
            payload:res.data,
            error:false,
            personel
        })
    }catch(e){
        dispatch({
            type:UPDATE_FROM_PERSONELLER,
            payload:console.log(e),
            error:true
        })
    }
}