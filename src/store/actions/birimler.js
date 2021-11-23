import axios from 'axios';
export const ADD_TO_BIRIM='ADD_TO_BIRIM';
export const REMOVE_FROM_BIRIM='REMOVE_FROM_BIRIM';
export const GET_BIRIMDATA = 'GET_BIRIMDATA';
export const GET_BIRIMBILGILERI= 'GET_BIRIMBILGILERI';



export const addToBirim = birim => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/Birimler/AddNewBirim',birim);
        dispatch({
            type:ADD_TO_BIRIM,
            payload:res.data,
            birim,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_BIRIM,
            payload:console.log(e),
            error:true,
            birim
        })
    }
;}

export const removeFromBirim = birim => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/Birimler/DeleteaBirim',birim);
        
        dispatch({
            type:REMOVE_FROM_BIRIM,
            payload:res.data,
            error:false,
            birim
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_BIRIM,
            payload:console.log(e),
            error:true
        })
    }
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
            payload:console.log(e),
            error:true
        })
    }
}


export const getBirimBilgileri = birimId =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/Birimler/GetListofBirimBilgileri?${birimId.map((n, index) => `Birimler[${index}]=${n}`).join('&')}`)
        dispatch({
            type:GET_BIRIMBILGILERI,
            payload:res.data,
            error:false
        })
    }
    catch(e){
        dispatch({
            type:GET_BIRIMBILGILERI,
            payload:console.log(e),
            error:true
        })
    }
}