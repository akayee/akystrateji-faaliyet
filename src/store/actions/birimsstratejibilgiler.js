import axios from 'axios';
export const GET_STRATEGY_DATA='GET_STRATEGY_DATA';




export const getStrategyData = (birimId) => async dispatch=>{
    try{
        const res =await axios.get(`https://localhost:44312/Isler/GetListOfStrateji?${birimId.map((n, index) => `Birimler[${index}]=${n}`).join('&')}`);
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
