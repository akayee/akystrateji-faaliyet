import {ADD_TO_ARACLAR,REMOVE_FROM_ARACLAR,GET_ARACLARDATA} from '../../actions/birimislemleri/araclistesi';


const initialState= {
    araclar:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_ARACLARDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    araclar:action.payload,
                    loading:false
                }
            }
        case ADD_TO_ARACLAR:
            let addedarac = action.arac;
            addedarac.adi=action.arac.Adi;
            let yeniaraclar = state.araclar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedarac.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    yeniaraclar.push(addedarac)           
    
                return { 
                    ...state,
                    araclar:yeniaraclar
                }
            }
        case REMOVE_FROM_ARACLAR:
            if(action.error==true)
            {
                return state
            }else{
                let updatedaracItem = state.araclar;
                updatedaracItem=updatedaracItem.filter(item=> item.id!=action.arac.id);
    
                return { 
                    ...state,
                    araclar:updatedaracItem
                }
            }
            
        default:
            return state;
    }
}