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
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedBirim.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
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
                let updatedBirimItem = state.birimler;
                updatedBirimItem=updatedBirimItem.filter(item=> item.id!=action.birim.id);
    
                return { 
                    ...state,
                    birimler:updatedBirimItem
                }
            }
            
        default:
            return state;
    }
}