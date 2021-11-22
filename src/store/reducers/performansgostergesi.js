import { ADD_TO_PERFORMANSGOSTERGESI, REMOVE_FROM_PERFORMANSGOSTERGESI, GET_PERFORMANSGOSTERGESIDATA, UPDATE_FROM_PERFORMANSGOSTERGESI } from '../actions/performansgostergesi';


const initialState = {
    performansgostergeleri: [],
    loading: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_PERFORMANSGOSTERGESIDATA:
            return {
                ...state,
                performansgostergeleri: action.payload,
                loading: false
            }
        case ADD_TO_PERFORMANSGOSTERGESI:
            let yeniperformansgostergeleri = state.performansgostergeleri;
            const addedPerformans = action.isturu;
            const id = action.payload;
            addedPerformans.id = id;
            yeniperformansgostergeleri.push(addedPerformans);
            return {
                ...state, performansgostergeleri: yeniperformansgostergeleri
            }
        case REMOVE_FROM_PERFORMANSGOSTERGESI:
            let allItems = { ...state.performansgostergeleri };
            delete allItems[action.performans.id];


            return {
                ...state, performansgostergeleri: allItems
            }
        case UPDATE_FROM_PERFORMANSGOSTERGESI:
            if (action.error == true) {

                return { ...state, loading: false, error: true, errormessage: action.payload }
            } else {
                let updatedPerformansGostergesi = state.performansgostergeleri;
                let updatedItem = action.performansgostergesi;
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedPerformansGostergesi.findIndex(obj => obj.id == updatedItem.id);
                updatedPerformansGostergesi[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    performansgostergeleri: updatedPerformansGostergesi,
                    error: false
                }
            }
        default:
            return state;
    }
}