export const ADD_TO_BIRIM='ADD_TO_BIRIM';

export const REMOVE_FROM_BIRIM='REMOVE_FROM_BIRIM';



export const addToBirim = birim =>{
    return {type:ADD_TO_BIRIM,birim:birim};
;}

export const removeFromBirim = birimId=>{
    return {type:REMOVE_FROM_BIRIM,bid:birimId}
};