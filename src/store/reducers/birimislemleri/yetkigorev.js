import { UPDATE_FIZIKSELYAPIDATA } from '../../actions/birimislemleri/fizikselyapilar';
import { ADD_TO_YETKIGOREV, GET_YETKIGOREVLER, REMOVE_FROM_YETKIGOREV } from '../../actions/birimislemleri/yetkigorev';


const initialState = {
    yetkigorevler: [],
    loading: true,
    error: false,
    errormessage: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_YETKIGOREV:
            let addedyetkigorev = action.yetkigorev;
            addedyetkigorev.adi = action.yetkigorev.Adi;
            addedyetkigorev.kanun = action.yetkigorev.Kanun;
            let yeniyetkigorevler = state.yetkigorevler;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedyetkigorev.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false,
                }
            } else {
                yeniyetkigorevler.push(addedyetkigorev)

                return {
                    ...state,
                    yetkigorevler: yeniyetkigorevler,
                    loading: false,
                }
            }
        case REMOVE_FROM_YETKIGOREV:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false,
                }
            } else {
                let updatedyetkigorevItem = state.yetkigorevler;
                updatedyetkigorevItem = updatedyetkigorevItem.filter(item => item.id != action.yetkigorev.id);

                return {
                    ...state,
                    yetkigorevler: updatedyetkigorevItem,
                    loading: false
                }
            }
        case GET_YETKIGOREVLER:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    yetkigorevler: action.payload,
                    loading: false
                }
            }
        case UPDATE_FIZIKSELYAPIDATA:
            if (action.error === true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                let updatedyetkigorevItem = state.yetkigorevler;
                let updatedItem = action.yetkigorev;
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedyetkigorevItem.findIndex(obj => obj.id == updatedItem.id);
                updatedyetkigorevItem[uindex] = updatedItem;
                return {
                    ...state,
                    yetkigorevler: updatedyetkigorevItem,
                    loading: false
                }
            }

        default:
            return state;
    }
}