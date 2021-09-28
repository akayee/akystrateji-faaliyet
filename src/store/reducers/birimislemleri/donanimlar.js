import { ADD_TO_DONANIMLAR, REMOVE_FROM_DONANIMLAR, GET_DONANIMDATA, UPDATE_FROM_DONANIM } from '../../actions/birimislemleri/donanimlar'


const initialState = {
    donanimlar: [],
    loading: true,
    error: false,
    errormessage: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_DONANIMDATA:

            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    donanimlar: action.payload,
                    loading: false
                }
            }
        case ADD_TO_DONANIMLAR:
            let addedDonanim = action.donanim;
            let yenidonanimlar = state.donanimlar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedDonanim.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                yenidonanimlar.push(addedDonanim)

                return {
                    ...state,
                    donanimlar: yenidonanimlar,
                    loading: false
                }
            }
        case REMOVE_FROM_DONANIMLAR:
            if (action.error == true) {
                return {
                    ...state,
                    loading: false
                }
            } else {
                let updatedDonanimItem = state.donanimlar;
                updatedDonanimItem = updatedDonanimItem.filter(item => item.id != action.donanim.id);

                return {
                    ...state,
                    donanimlar: updatedDonanimItem,
                    loading: false
                }
            }
        case UPDATE_FROM_DONANIM:
            if (action.error == true) {
                return { ...state, loading: false }
            } else {

                let updatedDonanimItem = state.donanimlar;
                let updatedItem = {
                    id: action.donanim.Id,
                    adi: action.donanim.Adi,
                    sayi: action.donanim.Sayi
                }
                //Ekranda düzgün gözüksün diye düzenleme yapılabilir.
                let uindex = updatedDonanimItem.findIndex(obj => obj.id == updatedItem.id);
                updatedDonanimItem[uindex] = updatedItem;
                return {
                    ...state,
                    loading: false,
                    donanimlar: updatedDonanimItem
                }
            }

        default:
            return state;
    }
}