import axios from 'axios';
export const ADD_TO_FIZIKSELYAPI='ADD_TO_FIZIKSELYAPI';
export const REMOVE_FROM_FIZIKSELYAPI='REMOVE_FROM_FIZIKSELYAPI';
export const GET_FIZIKSELYAPIDATA = 'GET_FIZIKSELYAPIDATA'



export const addToFizikselYapi= fizikselyapi => async dispatch=>{

    try{
        const res =await axios.post('https://localhost:44312/FizikselYapilar/AddNewaFizikselYapi',fizikselyapi);
        dispatch({
            type:ADD_TO_FIZIKSELYAPI,
            payload:res.data,
            fizikselyapi,
            error:false,
        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_FIZIKSELYAPI,
            payload:console.log(e),
            error:true,
            fizikselyapi
        })
    }
;}

export const removeFromFizikselYapilar = fizikselyapi => async dispatch=>{
    try{
        const res =await axios.post('https://localhost:44312/FizikselYapilar/DeleteaFizikselYapi',fizikselyapi);
        
        dispatch({
            type:REMOVE_FROM_FIZIKSELYAPI,
            payload:res.data,
            error:false,
            fizikselyapi
        })
    }
    catch(e){
        dispatch({
            type:REMOVE_FROM_FIZIKSELYAPI,
            payload:console.log(e),
            error:true
        })
    }
};

export const getFizikselYapiData = birimId =>async dispatch=> {
    try{
        const res =await axios.get(`https://localhost:44312/FizikselYapilar/GetListofFizikselYapilar?BirimId=${birimId}`)
        dispatch({
            type:GET_FIZIKSELYAPIDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_FIZIKSELYAPIDATA,
            payload:console.log(e)
        })
    }
}