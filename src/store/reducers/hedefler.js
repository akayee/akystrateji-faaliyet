import {ADD_TO_HEDEFLER,REMOVE_FROM_HEDEFLER,GET_HEDEFDATA, UPDATE_FROM_HEDEFLER} from '../actions/hedefler';


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
            let yenihedefler=state.hedefler;
            const addedHedef = action.hedef;
            const id=action.payload;
            addedHedef.id=id;
            addedHedef.hedeflerId=yenihedefler.filter(obj=>obj.amaclarId==action.hedef.amaclarId).length;
            yenihedefler.push(addedHedef);
            return {
                ...state,hedefler:yenihedefler
            }
        case REMOVE_FROM_HEDEFLER:
            let deletedItem={...state.hedefler};
            delete deletedItem[action.hedef.id];
            

            return{
                ...state,hedefler:deletedItem
            }
            case UPDATE_FROM_HEDEFLER:
                if (action.error == true) {
                    return { ...state, loading: false,error:true,errormessage:action.payload }
                } else {
    
                    let updatedHedefItem = state.hedefler;
                    let updatedItem = action.hedef;
                    //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                    let uindex = updatedHedefItem.findIndex(obj => obj.id == updatedItem.id);
                    updatedHedefItem[uindex] = updatedItem;
                    return {
                        ...state,
                        loading: false,
                        hedefler: updatedHedefItem,
                        error:false
                    }
                }
        default:
            return state;
    }
}