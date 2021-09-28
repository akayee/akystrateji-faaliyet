import { ADD_TO_ARACLAR, REMOVE_FROM_ARACLAR, GET_ARACLARDATA, UPDATE_FROM_ARACLAR } from '../../actions/birimislemleri/araclistesi';


const initialState = {
    araclar: [],
    loading: true,
    error: false,
    errormessage: '',
    aracCinsi:['Otomobil', 'Kamyonet', 'Pickup', 'Motor', 'Tır'],
    tahsisTuru:['Kiralık', 'Kamu', 'Başka Kurumun', 'Geçici']
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_ARACLARDATA:

            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    araclar: action.payload,
                    loading: false
                }
            }
        case ADD_TO_ARACLAR:
            let addedarac = action.arac;
            let yeniaraclar = state.araclar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedarac.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload
                }
            } else {
                yeniaraclar.push(addedarac)

                return {
                    ...state,
                    araclar: yeniaraclar
                }
            }
        case REMOVE_FROM_ARACLAR:
            if (action.error == true) {
                return state
            } else {
                let updatedaracItem = state.araclar;
                updatedaracItem = updatedaracItem.filter(item => item.id != action.arac.id);

                return {
                    ...state,
                    araclar: updatedaracItem
                }
            }
        case UPDATE_FROM_ARACLAR:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {

                let updatedDonanimItem = state.araclar;
                let updatedItem = {
                    id: action.arac.Id,
                    adi: action.arac.Adi,
                    aracCinsi:action.arac.AracCinsi,
                    tahsisTuru:action.arac.TahsisTuru
                }
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedDonanimItem.findIndex(obj => obj.id == updatedItem.id);
                updatedDonanimItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    araclar: updatedDonanimItem
                }
            }

        default:
            return state;
    }
}