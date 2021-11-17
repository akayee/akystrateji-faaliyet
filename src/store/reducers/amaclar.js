import { ADD_TO_AMACLAR, REMOVE_FROM_AMACLAR, GET_AMACDATA, UPDATE_FROM_AMACLAR } from '../actions/amaclar';
import { ADD_TO_HEDEFLER } from '../actions/hedefler';
import { ADD_TO_PERFORMANSLAR } from '../actions/performanslar';
import { ADD_TO_PERFORMANSGOSTERGESI } from '../actions/performansgostergesi';
import { ADD_TO_FAALIYETTURU } from '../actions/faaliyetturleri';


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
                let nextid = liste.filter(obj => obj.amaclarId == action.hedef.amaclarId).length
                liste.push({ id: action.payload, tanim: action.hedef.tanim, amaclarId: action.hedef.amaclarId, hedeflerId: nextid })
                return { ...state, stratejidata: { ...state.stratejidata, hedefler: liste } }
            }
        case ADD_TO_PERFORMANSLAR:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {
                let liste = state.stratejidata.performanslar;
                let nextid = liste.filter(obj => obj.hedeflerId == action.hedef.hedeflerId).length
                liste.push({ id: action.payload, adi: action.performans.adi, hedeflerId: action.performans.hedeflerId, performanslarId: nextid });
                return { ...state, stratejidata: { ...state.stratejidata, performanslar: liste } }
            }
        case ADD_TO_PERFORMANSGOSTERGESI:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {
                let liste = state.stratejidata.isturleri;
                let nextid = liste.filter(obj => obj.performansId == action.isturu.performansId).length
                liste.push({ id: action.payload, adi: action.isturu.adi, performansId: action.isturu.performansId, isturuId: nextid });
                return { ...state, stratejidata: { ...state.stratejidata, isturleri: liste } }
            }
        case ADD_TO_FAALIYETTURU:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {
                let liste = state.stratejidata.vmFaaliyetTurleri;
                let nextid = liste.filter(obj => obj.performansId == action.vmFaaliyetTurleri.performansId).length
                liste.push({ id: action.payload, adi: action.vmFaaliyetTurleri.adi, performansId: action.vmFaaliyetTurleri.performansId, faaliyetlerId: nextid });
                return { ...state, stratejidata: { ...state.stratejidata, vmFaaliyetTurleri: liste } }
            }

        default:
            return state;
    }
}