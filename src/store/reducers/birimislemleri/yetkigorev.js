import {ADD_TO_YETKIGOREV,REMOVE_FROM_YETKIGOREV} from '../../actions/birimislemleri/yetkigorev';


const initialState= {
    yetkigorevler:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case ADD_TO_YETKIGOREV:
            let addedyetkigorev = action.yetkigorev;
            addedyetkigorev.adi=action.yetkigorev.Adi;
            let yeniyetkigorevler = state.yetkigorevler;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedyetkigorev.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    yeniyetkigorevler.push(addedyetkigorev)           
    
                return { 
                    ...state,
                    yetkigorevler:yeniyetkigorevler
                }
            }
        case REMOVE_FROM_YETKIGOREV:
            if(action.error==true)
            {
                return state
            }else{
                let updatedyetkigorevItem = state.yetkigorevler;
                updatedyetkigorevItem=updatedyetkigorevItem.filter(item=> item.id!=action.yetkigorev.id);
    
                return { 
                    ...state,
                    yetkigorevler:updatedyetkigorevItem
                }
            }
            
        default:
            return state;
    }
}