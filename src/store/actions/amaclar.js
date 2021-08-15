export const ADD_TO_AMACLAR='ADD_TO_AMACLAR';

export const REMOVE_FROM_AMACLAR='REMOVE_FROM_AMACLAR';

export const GET_AMACDATA='GET_AMACDATA';

export const addToAmaclar = amac =>{
    return {type:ADD_TO_AMACLAR,amac}
};

export const removeFromAmaclar= amac=>{
    return {type:REMOVE_FROM_AMACLAR,amac}
};

export const getAmacData = birimId=>{
    try{
        const res =await axios.get(`https://localhost:44312/Isler/GetListofAmaclar`)
        dispatch({
            type:GET_STRATEGY_DATA,
            payload:res.data
        })
    }
    catch(e){
        dispatch({
            type:GET_STRATEGY_DATA,
            payload:console.log(e)
        })
    }
}