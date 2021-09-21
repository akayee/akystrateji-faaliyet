import axios from 'axios';
import { UPDATE_FIZIKSELYAPIDATA } from './fizikselyapilar';
export const ADD_TO_YETKIGOREV='ADD_TO_YETKIGOREV';
export const REMOVE_FROM_YETKIGOREV='REMOVE_FROM_YETKIGOREV';
export const GET_YETKIGOREVLER='GET_YETKIGOREVLER';
export const UPDATE_YETKIGOREV='UPDATE_YETKIGOREV';



export const addToYetkiGorev = yetkigorev => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/YetkiGorevTanimlari/AddNewaYetkiGorevTanimi',yetkigorev);
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
        const res =await axios.post('https://localhost:44312/YetkiGorevTanimlari/DeleteaYetkiGorevTanimi',yetkigorev);
        
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

export const getYetkiGorev =  birimId => async dispatch =>{
    try{
        const res = await axios.get(`https://localhost:44312/YetkiGorevTanimlari/GetListofYetkiGorevTanimlar?BirimId=${birimId}`);
        dispatch({
            type:GET_YETKIGOREVLER,
            payload:res.data,
            error:false
        })
    }catch(e){
        dispatch({
            type:GET_YETKIGOREVLER,
            payload:console.log(e),
            error:true
        })
    }
}
export const updateYetkiGorev = yetkigorev => async dispatch =>{
    try{
        const res = await axios.post('https://localhost:44312/YetkiGorevTanimlari/UpdateaYetkiGorevTanimi',yetkigorev);
        dispatch({
            type:UPDATE_FIZIKSELYAPIDATA,
            payload:res.data,
            error:false,
            yetkigorev
        })
    }catch(e){
        dispatch({
            type:UPDATE_FIZIKSELYAPIDATA,
            payload:console.log(e),
            error:true
        })
    }
}