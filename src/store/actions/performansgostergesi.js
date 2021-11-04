

import axios from 'axios';
export const ADD_TO_PERFORMANSGOSTERGESI='ADD_TO_PERFORMANSGOSTERGESI';

export const REMOVE_FROM_PERFORMANSGOSTERGESI='REMOVE_FROM_PERFORMANSGOSTERGESI';

export const GET_PERFORMANSGOSTERGESIDATA='GET_PERFORMANSGOSTERGESIDATA';

export const addToPerformansGostergesi = (isturu)=>async dispatch=>{
    try{
        const res =await axios.post(`https://localhost:44312/Isturu/AddNewIsturu`,isturu)
        dispatch({
            type:ADD_TO_PERFORMANSGOSTERGESI,
            payload:res.data,
            isturu,
            error:false

        })
    }
    catch(e){
        dispatch({
            type:ADD_TO_PERFORMANSGOSTERGESI,
            payload:console.log(e),
            isturu,
            error:true
        })
    }
};

export const removeFromPerformansGostergesi= isturu =>{
    
    return {type:REMOVE_FROM_PERFORMANSGOSTERGESI,isturu}
};

export const getPerformansGostergesiData = ()=> async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Isturu/GetListofIsturleri`)
        dispatch({
            type:GET_PERFORMANSGOSTERGESIDATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_PERFORMANSGOSTERGESIDATA,
            payload:console.log(e)
        })
    }
}