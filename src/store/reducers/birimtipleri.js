import {ADD_TO_BIRIMTIPI,REMOVE_FROM_BIRIMTIPI,GET_BIRIMTIPIDATA} from '../actions/birimtipleri';


const initialState= {
    birimTipleri:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_BIRIMTIPIDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    birimTipleri:action.payload,
                    loading:false
                }
            }
        case ADD_TO_BIRIMTIPI:
            let addedBirim = action.birimtipi;
            let yenibirimTipleri = state.birimTipleri;
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
                    //Eklenen birim state üzerinden güncelleniyor
                    yenibirimTipleri.push(addedBirim)           
    
                return { 
                    ...state,
                    birimTipleri:yenibirimTipleri
                }
            }
        case REMOVE_FROM_BIRIMTIPI:
            if(action.error==true)
            {
                return state
            }else{
                let updatedBirimTipiItem = state.birimTipleri;
                updatedBirimTipiItem=updatedBirimTipiItem.filter(item=> item.id!=action.birimtipi.id);
    
                return { 
                    ...state,
                    birimTipleri:updatedBirimTipiItem
                }
            }
            
        default:
            return state;
    }
}