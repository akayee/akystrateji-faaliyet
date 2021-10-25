import {ADD_TO_PERFORMANSLAR,REMOVE_FROM_PERFORMANSLAR , GET_PERFORMANSDATA} from '../actions/performanslar';


const initialState={
    performanslar:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_PERFORMANSDATA:
            return {
                ...state,
                performanslar:action.payload,
                loading:false
            }
        case ADD_TO_PERFORMANSLAR:
            let yeniperformanslar=state.performanslar
            const addedPerformans = action.performans
            const id=action.payload
            addedPerformans.id=id;
            yeniperformanslar.push(addedPerformans)
            return {
                ...state,performanslar:yeniperformanslar
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