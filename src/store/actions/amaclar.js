export const ADD_TO_AMACLAR='ADD_TO_AMACLAR';

export const REMOVE_FROM_AMACLAR='REMOVE_FROM_AMACLAR';

export const addToAmaclar = amac =>{
    return {type:ADD_TO_AMACLAR,amac}
};

export const removeFromAmaclar= amac=>{
    return {type:REMOVE_FROM_AMACLAR,amac}
};