import {ADD_TO_PERFORMANSLAR,REMOVE_FROM_PERFORMANSLAR} from '../actions/performanslar';

import PerformansItem from '../../models/performans-item';

const initialState={
    performanslar:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_PERFORMANSLAR:
            const addedData = action.performans
            const id=state.performanslar.length+1;
            let updatedOrNewItem = new PerformansItem(id,addedData.Tanim,action.amacId,action.hedefId)
            
            return {
                ...state,performanslar:{[id]:updatedOrNewItem}
            }
        case REMOVE_FROM_PERFORMANSLAR:
            let allItems={...state.performanslar};
            delete allItems[action.performans.id];
            

            return{
                ...state,performanslar:allItems
            }
        default:
            return state;
    }
}