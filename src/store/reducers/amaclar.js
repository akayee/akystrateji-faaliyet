import { ADD_TO_AMACLAR, REMOVE_FROM_AMACLAR, GET_AMACDATA, UPDATE_FROM_AMACLAR } from '../actions/amaclar';

import AmacItem from '../../models/amac_item';

const initialState = {
    amaclar: [],
    loading: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_AMACDATA:
            return {
                ...state,
                amaclar: action.payload,
                loading: false
            }
        case ADD_TO_AMACLAR:
            const addedAmac = action.amac
            const id = state.amaclar.length + 1;
            let updatedOrNewAmacItem = new AmacItem(id, addedAmac.Tanim)

            return {
                ...state, amaclar: { [id]: updatedOrNewAmacItem }
            }
        case REMOVE_FROM_AMACLAR:
            let updatedAmacItem = { ...state.amaclar };
            delete updatedAmacItem[action.amac.id]


            return {
                ...state, amaclar: updatedAmacItem
            }
        case UPDATE_FROM_AMACLAR:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {

                let updatedDonanimItem = state.amaclar;
                let updatedItem = action.amac;
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedDonanimItem.findIndex(obj => obj.id == updatedItem.id); 
                updatedDonanimItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    amaclar: updatedDonanimItem
                }
            }

        default:
            return state;
    }
}