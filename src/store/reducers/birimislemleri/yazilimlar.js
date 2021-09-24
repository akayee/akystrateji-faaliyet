import { ADD_TO_YAZILIMLAR, REMOVE_FROM_YAZILIMLAR, GET_YAZILIMLARDATA, UPDATE_FROM_YAZILIM } from '../../actions/birimislemleri/yazilimlar';


const initialState = {
    yazilimlar: [],
    loading: true,
    error: false,
    errormessage: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_YAZILIMLARDATA:

            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    yazilimlar: action.payload,
                    loading: false
                }
            }
        case ADD_TO_YAZILIMLAR:
            let addedBirim = action.yazilim;
            let yeniyazilimlar = state.yazilimlar;
            addedBirim.adi = action.yazilim.Adi;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedBirim.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                //Eklenen birim state üzerinden güncelleniyor
                yeniyazilimlar.push(addedBirim)

                return {
                    ...state,
                    yazilimlar: yeniyazilimlar,
                    loading: false
                }
            }
        case REMOVE_FROM_YAZILIMLAR:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                let updatedYazilimItem = state.yazilimlar;
                updatedYazilimItem = updatedYazilimItem.filter(item => item.id != action.yazilim.id);

                return {
                    ...state,
                    yazilimlar: updatedYazilimItem,
                    loading: false
                }
            }
        case UPDATE_FROM_YAZILIM:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {

                let updatedDonanimItem = state.yazilimlar;
                let updatedItem = {
                    id: action.yazilim.Id,
                    adi: action.yazilim.Adi
                }
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedDonanimItem.findIndex(obj => obj.id == updatedItem.id);
                updatedDonanimItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    yazilimlar: updatedDonanimItem
                }
            }

        default:
            return state;
    }
}