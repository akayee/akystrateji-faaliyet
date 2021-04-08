import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid } from '@material-ui/core';
import Chart from 'react-apexcharts'


const LinearProg = props => {
    const options = {
        labels:["Faaliyet","Maaliyet"]
    }

const series = [props.gerceklesmeOrani, props.gerceklesmeOrani > 100 ? 0 : 100 - props.gerceklesmeOrani]


return <Grid container >
    {/* <Grid item xs={2}>
        %{props.gerceklesmeOrani}


    </Grid> */}
    <Grid item xs={12} style={{display:"flex", justifyContent:"flex-end"}} >
        {/* <LinearProgress variant="determinate" color={props.gerceklesmeOrani<70?'secondary':'primary'} value={props.gerceklesmeOrani>100?100:props.gerceklesmeOrani} /> */}
        <Chart options={options} series={series} type="donut" width={200} />
    </Grid>

</Grid>
}
export default LinearProg