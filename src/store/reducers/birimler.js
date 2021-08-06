import {ADD_TO_BIRIM,REMOVE_FROM_BIRIM} from '../actions/birimler';
import BirimItem from '../../models/birim-item';
import BIRIMLER from '../../data/birimler';


const initialState= {
    birimler:BIRIMLER,
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_BIRIM:
            const addedBirim = action.birim;
            

            let updateOrNewBirimItem;
            if ( !state.birimler[addedBirim.id]){
                //Eklenecek Birim Birimlerimiz Arasında Yok İse
                updateOrNewBirimItem = new BirimItem(addedBirim.id,addedBirim.birimAdi,addedBirim.UstBirimId,addedBirim.BirimTipi);                
            }
            return {
                ...state,
                birimler:{...state.birimler,[addedBirim.id]:updateOrNewBirimItem}
            }
        case REMOVE_FROM_BIRIM:
            let updatedBirimItem = {...state.birimler}
            delete updateOrNewBirimItem[action.bid]

            return { 
                ...state,
                birimler:updatedBirimItem
            }
        default:
            return state;
    }
}