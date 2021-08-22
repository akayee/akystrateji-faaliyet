import {ADD_TO_MEVZUAT,REMOVE_FROM_MEVZUAT} from '../../actions/birimislemleri/mevzuatlar';


const initialState= {
    mevzuatlar:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_MEVZUAT:
            let addedMevzuat = action.mevzuat;
            addedMevzuat.adi=action.mevzuat.Adi;
            let yenimevzuatlar = state.mevzuatlar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedMevzuat.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    yenimevzuatlar.push(addedMevzuat)           
    
                return { 
                    ...state,
                    mevzuatlar:yenimevzuatlar
                }
            }
        case REMOVE_FROM_MEVZUAT:
            if(action.error==true)
            {
                return state
            }else{
                let updatedMevzuatItem = state.mevzuatlar;
                updatedMevzuatItem=updatedMevzuatItem.filter(item=> item.id!=action.mevzuat.id);
    
                return { 
                    ...state,
                    mevzuatlar:updatedMevzuatItem
                }
            }
            
        default:
            return state;
    }
}