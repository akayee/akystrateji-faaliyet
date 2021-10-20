import axios from 'axios';
export const ADD_TO_YIL='ADD_TO_YIL';
export const REMOVE_FROM_YIL='REMOVE_FROM_YIL';
export const GET_YILDATA = 'GET_YILDATA';


export const addToStratejiYili = yil => async dispatch=>{

    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/StratejiYili/AddNewaStratejiYili',yil);
        dispatch({
            type:ADD_TO_YIL,
            payload:res.data,
            yil,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_YIL,
            payload:console.log(e),
            error:true,
            yil
        })
    }
;}

export const removeFromStratejiYili = yil => async dispatch=>{
    try{
        //TODO linki kontrol et
        const res =await axios.post('https://localhost:44312/StratejiYili/DeleteaStratejiYili',yil);
        
        dispatch({
            type:REMOVE_FROM_YIL,
            payload:res.data,
            error:false,
            yil
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_YIL,
            payload:console.log(e),
            error:true
        })
    }
};

export const getStratejiYiliData = () =>async dispatch=> {
    try{
        //TODO linki kontrol et
        const res =await axios.get(`https://localhost:44312/StratejiYili/GetListofStratejiYili`)
        dispatch({
            type:GET_YILDATA,
            payload:res.data,
            error:false
        })
    }
    catch(e){
        dispatch({
            type:GET_YILDATA,
            payload:console.log(e),
            error:true
        })
    }
}
