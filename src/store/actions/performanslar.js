export const ADD_TO_PERFORMANSLAR='ADD_TO_PERFORMANSLAR';

export const REMOVE_FROM_PERFORMANSLAR='REMOVE_FROM_PERFORMANSLAR';

export const addToPerformanslar = (performans,amacId,hedefId)=>{
    return {type:ADD_TO_PERFORMANSLAR,performans,amacId,hedefId};
};

export const removeFromPerformanslar= performans =>{
    
    return {type:REMOVE_FROM_PERFORMANSLAR,performans}
};