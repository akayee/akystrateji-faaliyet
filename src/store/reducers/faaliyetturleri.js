import {ADD_TO_FAALIYETTURU,GET_FAALIYETTURU,REMOVE_FROM_FAALIYETTURU} from '../actions/faaliyetturleri';


const initialState={
    faaliyetturleri:[],
    loading:false
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_FAALIYETTURU:
            return {
                ...state,
                faaliyetturleri:action.payload,
                loading:false
            }
        case ADD_TO_FAALIYETTURU:
            let yenifaaliyetturleri=state.faaliyetturleri;
            const addedFaaliyetturu = action.faaliyetturu;
            const id=action.payload;
            addedFaaliyetturu.id=id;
            yenifaaliyetturleri.push(addedFaaliyetturu);
            return {
                ...state,faaliyetturleri:yenifaaliyetturleri
            }
        case REMOVE_FROM_FAALIYETTURU:
            let allItems={...state.faaliyetturleri};
            delete allItems[action.performans.id];
            

            return{
                ...state,faaliyetturleri:allItems
            }
        default:
            return state;
    }
}