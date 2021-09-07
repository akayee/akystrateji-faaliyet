import {ADD_TO_FIZIKSELYAPI,GET_FIZIKSELYAPIDATA,REMOVE_FROM_FIZIKSELYAPI,UPDATE_FIZIKSELYAPIDATA} from '../../actions/birimislemleri/fizikselyapilar';


const initialState= {
    fizikselyapilar:[],
    loading:true,
    error:false,
    errormessage:''
};

export default (state=initialState,action)=>{

    switch(action.type){
        case GET_FIZIKSELYAPIDATA:

            if(action.error==true)
            {
                return { 
                    ...state,
                    errormessage:action.payload,
                    loading:false
                }
            }else{
                return {
                    ...state,
                    fizikselyapilar:action.payload,
                    loading:false
                }
            }
        case ADD_TO_FIZIKSELYAPI:
            let addedfizikselyapi = action.fizikselyapi;
            addedfizikselyapi.adi=addedfizikselyapi.Adi;
            addedfizikselyapi.konum=addedfizikselyapi.Konum;
            addedfizikselyapi.metreKare=addedfizikselyapi.MetreKare;
            let yenifizikselyapilar = state.fizikselyapilar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedfizikselyapi.id=action.payload;
            if(action.error==true)
            {
                return {
                    ...state,
                    errormessage:action.payload
                }
            }else{
                    yenifizikselyapilar.push(addedfizikselyapi)           
    
                return { 
                    ...state,
                    fizikselyapilar:yenifizikselyapilar
                }
            }
        case REMOVE_FROM_FIZIKSELYAPI:
            if(action.error==true)
            {
                return state
            }else{
                let updatedfizikselyapiItem = state.fizikselyapilar;
                updatedfizikselyapiItem=updatedfizikselyapiItem.filter(item=> item.id!=action.fizikselyapi.id);
    
                return { 
                    ...state,
                    fizikselyapilar:updatedfizikselyapiItem
                }
            }
        case UPDATE_FIZIKSELYAPIDATA:
            if(action.error==true){

                return {...state,
                error:true}
            }else{
                let updatedfizikselyapiItem = state.fizikselyapilar;
                let updatedItem= action.payload;
                let updateIndex = updatedfizikselyapiItem.findIndex(obj=>obj.id==updatedItem.id);
                updatedfizikselyapiItem[updateIndex]=updatedItem;
                return {
                    ...state,
                    fizikselyapilar:updatedfizikselyapiItem
                }
            }
        default:
            return state;
    }
}