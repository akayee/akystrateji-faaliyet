import {GET_STRATEGY_DATA} from '../actions/birimsstratejibilgiler';
import BirimItem from '../../models/birim-item';


const initialState= {
    strategydata:[],
    stratejiYillari:[],
    birimler:null,
    birimtipi:null,
    loading:true
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_STRATEGY_DATA:

            return {
                ...state,
                strategydata:action.payload,
                birimler:action.birimler,
                birimtipi:action.birimtipi,
                loading:false
            }
        default:
            return state;
    }
}