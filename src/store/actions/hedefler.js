export const ADD_TO_HEDEFLER='ADD_TO_HEDEFLER';

export const REMOVE_FROM_HEDEFLER='REMOVE_FROM_HEDEFLER';

export const addToHedefler = (hedef,amacId)=>{
    return {type:ADD_TO_HEDEFLER,hedef,amacId};
};

export const removeFromHedefler= hedef =>{
    
    return {type:REMOVE_FROM_HEDEFLER,hedef}
};