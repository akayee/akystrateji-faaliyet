import {ADD_TO_BIRIM,REMOVE_FROM_BIRIM, GET_BIRIMDATA,GET_BIRIMBILGILERI} from '../actions/birimler';


const initialState= {
    birimler:[],
    loading:true,
    error:false,
    errormessage:'',
    birimbilgileri:[]
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_BIRIMDATA:
            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload,
                    loadiing:false,
                    error:true
                }
            }else{
                return {
                    ...state,
                    birimler:action.payload,
                    loading:false,
                    error:false
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
                    errormessage:action.payload,
                    loading:false
                }
            }else{
                    yenibirimler.push(addedBirim)           
    
                return { 
                    ...state,
                    birimler:yenibirimler,
                    loading:false
                }
            }
        case REMOVE_FROM_BIRIM:
            if(action.error==true)
            {
                return {...state,
                    loading:false}
            }else{
                let updatedBirimItem = state.birimler;
                updatedBirimItem=updatedBirimItem.filter(item=> item.id!=action.birim.id);
    
                return { 
                    ...state,
                    birimler:updatedBirimItem,
                    loading:false
                }
            }
        case GET_BIRIMBILGILERI:
            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload,
                    loading:false,
                    error:true
                }
            }else{
                return {
                    ...state,
                    birimbilgileri:action.payload,
                    loading:false,
                    error:false
                }
            }
        default:
            return state;
    }
}