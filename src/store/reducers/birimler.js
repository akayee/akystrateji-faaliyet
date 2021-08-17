import {ADD_TO_BIRIM,REMOVE_FROM_BIRIM, GET_BIRIMDATA} from '../actions/birimler';
import BirimItem from '../../models/birim-item';
import BIRIMLER from '../../data/birimler';


const initialState= {
    birimler:BIRIMLER,
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_BIRIMDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    birimler:action.payload,
                    loading:false
                }
            }
        case ADD_TO_BIRIM:
            let addedBirim = action.birim
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                let updateOrNewBirimItem;
                if ( !state.birimler[addedBirim.id]){
                    //Eklenecek Birim Birimlerimiz Arasında Yok İse
                    updateOrNewBirimItem = new BirimItem(addedBirim.id,addedBirim.birimAdi,addedBirim.UstBirimId,addedBirim.BirimTipi);                
                }
    
                return { 
                    ...state,
                    birimler:{...state.birimler,[addedBirim.id]:updateOrNewBirimItem}
                }
            }
        case REMOVE_FROM_BIRIM:
            if(action.error==true)
            {
                return state
            }else{
                let updatedBirimItem = {...state.birimler}
                delete updatedBirimItem[action.bid]
    
                return { 
                    ...state,
                    birimler:updatedBirimItem
                }
            }
            
        default:
            return state;
    }
}