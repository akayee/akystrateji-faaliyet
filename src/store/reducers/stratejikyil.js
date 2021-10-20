import { ADD_TO_YIL, REMOVE_FROM_YIL, GET_YILDATA } from '../actions/stratejikyil';


const initialState = {
    yillar: [],
    loading: true,
    error: false,
    errormessage: '',
    gosterilecekYil:[0,1,2,3,4]
};

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_YILDATA:

            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    yillar: action.payload,
                    loading: false
                }
            }
        case ADD_TO_YIL:
            let addedyil = action.yil;
            let yeniyillar = state.yillar;
            //Eklenen yeni datanın idsi api üzerinden frontende dönülüyor.
            //Bu durum ekleme anından hemen sonra denenen silme işlemlerinde hata alınmasını engellemek için.
            //Deleted columnları true olanlar görünmediği için yanlış veri silinmeye çalışılabiliyor.
            addedyil.id = action.payload;
            if (action.error == true) {
                return {
                    ...state,
                    errormessage: action.payload
                }
            } else {
                yeniyillar.push(addedyil)

                return {
                    ...state,
                    yillar: yeniyillar
                }
            }
        case REMOVE_FROM_YIL:
            if (action.error == true) {
                return state
            } else {
                let updatedyilItem = state.yillar;
                updatedyilItem = updatedyilItem.filter(item => item.id != action.yil.id);

                return {
                    ...state,
                    yillar: updatedyilItem
                }
            }
        

        default:
            return state;
    }
}