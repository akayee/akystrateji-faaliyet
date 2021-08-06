import {ADD_TO_AMACLAR,REMOVE_FROM_AMACLAR} from '../actions/amaclar';

import AmacItem from '../../models/amac_item';

const initialState={
    amaclar:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_AMACLAR:
            const addedAmac = action.amac
            const id=state.amaclar.length+1;
            let updatedOrNewAmacItem = new AmacItem(id,addedAmac.Tanim)
            
            return {
                ...state,amaclar:{[id]:updatedOrNewAmacItem}
            }
        case REMOVE_FROM_AMACLAR:
            let updatedAmacItem={...state.amaclar};
            delete updatedAmacItem[action.amac.id]
            

            return{
                ...state,amaclar:updatedAmacItem
            }
        default:
            return state;
    }
}