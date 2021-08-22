import {ADD_TO_PERSONELLER,REMOVE_FROM_PERSONELLER,GET_PERSONELLERDATA} from '../../actions/birimislemleri/personeller';


const initialState= {
    personeller:[],
    loading:false,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_PERSONELLERDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload
                }
            }else{
                return {
                    ...state,
                    personeller:action.payload,
                    loading:false
                }
            }
        case ADD_TO_PERSONELLER:
            let addedpersonel = action.personel;
            let yenipersoneller = state.personeller;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedpersonel.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    yenipersoneller.push(addedpersonel)           
    
                return { 
                    ...state,
                    personeller:yenipersoneller
                }
            }
        case REMOVE_FROM_PERSONELLER:
            if(action.error==true)
            {
                return state
            }else{
                let updatedpersonelItem = state.personeller;
                updatedpersonelItem=updatedpersonelItem.filter(item=> item.id!=action.personel.id);
    
                return { 
                    ...state,
                    personeller:updatedpersonelItem
                }
            }
            
        default:
            return state;
    }
}