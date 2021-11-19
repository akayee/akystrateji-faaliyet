import { ADD_TO_PERFORMANSLAR, REMOVE_FROM_PERFORMANSLAR, GET_PERFORMANSDATA, UPDATE_FROM_PERFORMANSLAR } from '../actions/performanslar';


const initialState = {
    performanslar: [],
    loading: true
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_PERFORMANSDATA:
            return {
                ...state,
                performanslar: action.payload,
                loading: false
            }
        case ADD_TO_PERFORMANSLAR:
            let yeniperformanslar = state.performanslar;
            const addedPerformans = action.performans;
            const id = action.payload;
            addedPerformans.id = id;
            addedPerformans.performanslarId = yeniperformanslar.filter(obj => obj.hedeflerId == action.performans.hedeflerId);
            yeniperformanslar.push(addedPerformans);
            return {
                ...state, performanslar: yeniperformanslar
            }
        case REMOVE_FROM_PERFORMANSLAR:
            let allItems = { ...state.performanslar };
            delete allItems[action.performans.id];


            return {
                ...state, performanslar: allItems
            }

        case UPDATE_FROM_PERFORMANSLAR:
            if (action.error == true) {
                return { ...state, loading: false, error: true, errormessage: action.payload }
            } else {

                let updatedPerformansItem = state.performanslar;
                let updatedItem = action.performans;
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedPerformansItem.findIndex(obj => obj.id == updatedItem.id);
                updatedPerformansItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    performanslar: updatedPerformansItem,
                    error: false
                }
            }
        default:
            return state;
    }
}