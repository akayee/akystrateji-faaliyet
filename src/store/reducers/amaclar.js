import { ADD_TO_AMACLAR, REMOVE_FROM_AMACLAR, GET_AMACDATA, UPDATE_FROM_AMACLAR } from '../actions/amaclar';
import { ADD_TO_HEDEFLER } from '../actions/hedefler';
import { ADD_TO_PERFORMANSLAR } from '../actions/performanslar';

import AmacItem from '../../models/amac_item';

const initialState = {
    amaclar: [],
    stratejidata: [],
    loading: true
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_AMACDATA:
            return {
                ...state,
                amaclar: action.payload,
                loading: false,
                stratejidata: action.stratejidata
            }
        case ADD_TO_AMACLAR:
            let yeniamaclar = state.amaclar;
            const addedAmac = action.amac
            const id = action.payload;
            let updatedOrNewAmacItem = new AmacItem(id, addedAmac.adi)
            addedAmac.id = id;
            let liste = state.stratejidata.stratejikAmac;
            liste.push(addedAmac);
            yeniamaclar.push(addedAmac)


            return {
                ...state, amaclar: yeniamaclar, stratejidata: { ...state.stratejidata, stratejikAmac: liste }
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
        case ADD_TO_HEDEFLER:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {
                let liste = state.stratejidata.hedefler;
                liste.push({ id: action.payload, tanim: action.hedef.tanim, amaclarId: action.hedef.amaclarId })
                return { ...state, stratejidata: { ...state.stratejidata, hedefler: liste } }
            }

        case ADD_TO_PERFORMANSLAR:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {
                let liste = state.stratejidata.performanslar;
                liste.push({ id: action.payload, tanim: action.performans.tanim, hedeflerId: action.performans.amaclarId })
                return { ...state, stratejidata: { ...state.stratejidata, performanslar: liste } }
            }

        default:
            return state;
    }
}