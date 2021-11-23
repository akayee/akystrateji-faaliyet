import {GET_STRATEGY_DATA} from '../actions/birimsstratejibilgiler';


const initialState= {
    strategydata:[],
    stratejiYillari:[],
    birimler:null,
    birimtipi:null,
    loading:true,
    error:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_STRATEGY_DATA:
        if(action.error){
            return {...state,loading:false,error:true}
        }else{
            return {
                ...state,
                strategydata:action.payload,
                birimler:action.birimler,
                birimtipi:action.birimtipi,
                loading:false,
                error:false
            }
        }
            
        default:
            return state;
    }
}