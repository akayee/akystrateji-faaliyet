import {ADD_TO_BIRIM,REMOVE_FROM_BIRIM, GET_BIRIMDATA} from '../actions/birimler';


const initialState= {
    birimler:[],
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
            let addedBirim = action.birim;
            addedBirim.adi=action.birim.Adi;
            let yenibirimler = state.birimler;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    //Eklenecek Birim Birimlerimiz Arasında Yok İse 
                    yenibirimler.push(addedBirim)           
    
                return { 
                    ...state,
                    birimler:yenibirimler
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