import axios from 'axios';
export const ADD_TO_YETKIGOREV='ADD_TO_YETKIGOREV';
export const REMOVE_FROM_YETKIGOREV='REMOVE_FROM_YETKIGOREV';



export const addToYetkiGorev = yetkigorev => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/YetkiGorevler/AddNewYetkiGorev',yetkigorev);
        dispatch({
            type:ADD_TO_YETKIGOREV,
            payload:res.data,
            yetkigorev,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_YETKIGOREV,
            payload:console.log(e),
            error:true,
            yetkigorev
        })
    }
;}

export const removeFromYetkiGorev= yetkigorev => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/YetkiGorevler/DeleteaYetkiGorev',yetkigorev);
        
        dispatch({
            type:REMOVE_FROM_YETKIGOREV,
            payload:res.data,
            error:false,
            yetkigorev
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_YETKIGOREV,
            payload:console.log(e),
            error:true
        })
    }
};
