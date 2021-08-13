import axios from 'axios';
export const GET_STRATEGY_DATA='GET_STRATEGY_DATA';




export const getStrategyData = () => async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Isler/GetListOfStrateji?BirimId=2`)
        dispatch({
            type:GET_STRATEGY_DATA,
            payload:res.data,
            birimler:res.data.birim,
            birimtipi:res.data.birimTipi
        })
    }
    catch(e){
        dispatch({
            type:GET_STRATEGY_DATA,
            payload:console.log(e)
        })
    }
;}
