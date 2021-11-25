import { GET_STRATEGY_DATA, GET_FAALIYET_DATA } from '../actions/birimsstratejibilgiler';


const initialState = {
    strategydata: [],
    stratejiYillari: [],
    faaliyetRaporu: [],
    birimler: null,
    birimtipi: null,
    loading: true,
    error: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_STRATEGY_DATA:
            if (action.error) {
                return { ...state, loading: false, error: true }
            } else {
                return {
                    ...state,
                    strategydata: action.payload,
                    birimler: action.birimler,
                    birimtipi: action.birimtipi,
                    loading: false,
                    error: false
                }
            }
        case GET_FAALIYET_DATA:
            if (action.error) {
                return { ...state, loading: false, error: true }
            } else {
                return {
                    ...state,
                    faaliyetRaporu: action.payload,
                    loading: false,
                    error: false
                }
            }

        default:
            return state;
    }
}