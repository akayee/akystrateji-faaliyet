import{ 
    SHOW_LOADING_SPINNER,
    GET_HOME_ACCOUNTS,
    GET_HOME_EXPENSES
} from '../actions'

const defaultState = {
    giderler:[],
    account:[],
    recentactivities:[],
    searchTerm:'',
    firmID:'',
    value: 0,
    index:''
  };

  export default function(state= defaultState , action){
      switch(action.type){
          case GET_HOME_ACCOUNTS:
              return {
                  ...state,
                  account: action.payload.results,
                  loading:false,
                  searchTerm:action.payload.firmID,
              }
            case GET_HOME_EXPENSES:
                return{
                    ...state,
                    giderler:action.payload.results,
                    loading:false,
                    searchTerm:action.payload.firmID
                }
            case SHOW_LOADING_SPINNER:
                return{
                    ...state,
                    loading: true 
                }
            default:
                return state;
      }
  }