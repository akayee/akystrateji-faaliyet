import {ADD_TO_OLCUBIRIMI,GET_OLCUBIRIMIDATA,REMOVE_FROM_OLCUBIRIMI} from '../actions/olcubirimi';


const initialState= {
    olcubirimi:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_OLCUBIRIMIDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    olcubirimi:action.payload,
                    loading:false
                }
            }
        case ADD_TO_OLCUBIRIMI:
            let addedBirim = action.olcubirimi;
            let yenibirimler = state.olcubirimi;
            addedBirim.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload,
                    error:true
                }
            }else{
                    //Eklenecek Birim Birimlerimiz Arasında Yok İse 
                    yenibirimler.push(addedBirim)           
    
                return { 
                    ...state,
                    olcubirimi:yenibirimler
                }
            }
        case REMOVE_FROM_OLCUBIRIMI:
            if(action.error==true)
            {
                return {...state,error:true}
            }else{
                let updatedBirimItem = state.olcubirimi;
                updatedBirimItem=updatedBirimItem.filter(item=> item.id!=action.olcubirimi.id);
    
                return { 
                    ...state,
                    olcubirimi:updatedBirimItem
                }
            }
            
        default:
            return state;
    }
}