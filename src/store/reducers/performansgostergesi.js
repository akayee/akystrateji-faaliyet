import {ADD_TO_PERFORMANSGOSTERGESI,REMOVE_FROM_PERFORMANSGOSTERGESI,GET_PERFORMANSGOSTERGESIDATA} from '../actions/performansgostergesi';


const initialState={
    performansgostergeleri:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_PERFORMANSGOSTERGESIDATA:
            return {
                ...state,
                performansgostergeleri:action.payload,
                loading:false
            }
        case ADD_TO_PERFORMANSGOSTERGESI:
            let yeniperformansgostergeleri=state.performansgostergeleri;
            const addedPerformans = action.performans;
            const id=action.payload;
            addedPerformans.id=id;
            addedPerformans.performansgostergeleriId=yeniperformansgostergeleri.filter(obj=>obj.hedeflerId==action.performans.hedeflerId);
            yeniperformansgostergeleri.push(addedPerformans);
            return {
                ...state,performansgostergeleri:yeniperformansgostergeleri
            }
        case REMOVE_FROM_PERFORMANSGOSTERGESI:
            let allItems={...state.performansgostergeleri};
            delete allItems[action.performans.id];
            

            return{
                ...state,performansgostergeleri:allItems
            }
        default:
            return state;
    }
}