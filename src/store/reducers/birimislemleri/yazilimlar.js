import {ADD_TO_YAZILIMLAR,REMOVE_FROM_YAZILIMLAR,GET_YAZILIMLARDATA} from '../../actions/birimislemleri/yazilimlar';


const initialState= {
    yazilimlar:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_YAZILIMLARDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    yazilimlar:action.payload,
                    loading:false
                }
            }
        case ADD_TO_YAZILIMLAR:
            let addedBirim = action.yazilim;
            let yeniyazilimlar = state.yazilimlar;
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
                    yeniyazilimlar.push(addedBirim)           
    
                return { 
                    ...state,
                    yazilimlar:yeniyazilimlar
                }
            }
        case REMOVE_FROM_YAZILIMLAR:
            if(action.error==true)
            {
                return state
            }else{
                let updatedYazilimItem = state.yazilimlar;
                updatedYazilimItem=updatedYazilimItem.filter(item=> item.id!=action.yazilim.id);
    
                return { 
                    ...state,
                    yazilimlar:updatedYazilimItem
                }
            }
            
        default:
            return state;
    }
}