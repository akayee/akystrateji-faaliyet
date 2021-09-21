import { ADD_TO_MEVZUAT, REMOVE_FROM_MEVZUAT, GET_MEVZUATLAR, UPDATE_FROM_MEVZUATLAR } from '../../actions/birimislemleri/mevzuatlar';


const initialState = {
    mevzuatlar: [],
    loading: false,
    error: false,
    errormessage: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_MEVZUAT:
            let addedMevzuat = action.mevzuat;
            addedMevzuat.adi = action.mevzuat.Adi;
            let yenimevzuatlar = state.mevzuatlar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedMevzuat.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                yenimevzuatlar.push(addedMevzuat)

                return {
                    ...state,
                    mevzuatlar: yenimevzuatlar,
                    loading: false
                }
            }
        case REMOVE_FROM_MEVZUAT:
            if (action.error == true) {
                return {
                    state,
                    loading: false
                }
            } else {
                let updatedMevzuatItem = state.mevzuatlar;
                updatedMevzuatItem = updatedMevzuatItem.filter(item => item.id != action.mevzuat.id);

                return {
                    ...state,
                    mevzuatlar: updatedMevzuatItem,
                    loading: false
                }
            }
        case GET_MEVZUATLAR:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    mevzuatlar: action.payload
                }
            }
        case UPDATE_FROM_MEVZUATLAR:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                let updatedMevzuatItem = state.yetkigorevler;
                let updatedItem = {
                    id: action.mevzuat.id,
                    yonetmelik: action.mevzuat.Yonetmelik,
                    tanim: action.mevzuat.Tanim
                }
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedMevzuatItem.findIndex(obj => obj.id == updatedItem.id);
                updatedMevzuatItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    mevzuatlar:updatedMevzuatItem
                }
            }

        default:
            return state;
    }
}