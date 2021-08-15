export const ADD_TO_PERFORMANSLAR='ADD_TO_PERFORMANSLAR';

export const REMOVE_FROM_PERFORMANSLAR='REMOVE_FROM_PERFORMANSLAR';

export const GET_PERFORMANSDATA='GET_PERFORMANSDATA';

export const addToPerformanslar = (performans,amacId,hedefId)=>{
    return {type:ADD_TO_PERFORMANSLAR,performans,amacId,hedefId};
};

export const removeFromPerformanslar= performans =>{
    
    return {type:REMOVE_FROM_PERFORMANSLAR,performans}
};

export const getPerformansData = birimId=>{
    try{
        const res =await axios.get(`https://localhost:44312/Isler/GetListofPerformanslar`)
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