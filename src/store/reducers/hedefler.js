import {ADD_TO_HEDEFLER,REMOVE_FROM_HEDEFLER,GET_HEDEFDATA} from '../actions/hedefler';


const initialState={
    hedefler:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_HEDEFDATA:
            return {
                ...state,
                hedefler:action.payload,
                loading:false
            }
        case ADD_TO_HEDEFLER:
            let yenihedefler=state.hedefler
            const addedHedef = action.hedef
            const id=action.payload
            addedHedef.id=id;
            yenihedefler.push(addedHedef)
            return {
                ...state,hedefler:yenihedefler
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