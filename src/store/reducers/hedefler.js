import {ADD_TO_HEDEFLER,REMOVE_FROM_HEDEFLER} from '../actions/hedefler';

import HedefItem from '../../models/hedef-item';

const initialState={
    hedefler:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_HEDEFLER:
            const addedHedef = action.hedef
            const id=state.hedefler.length+1;
            let updatedOrNewItem = new HedefItem(id,addedHedef.Tanim,action.amacId)
            
            return {
                ...state,hedefler:{[id]:updatedOrNewItem}
            }
        case REMOVE_FROM_HEDEFLER:
            let deletedItem={...state.hedefler};
            delete deletedItem[action.hedef.id];
            

            return{
                ...state,hedefler:deletedItem
            }
        default:
            return state;
    }
}