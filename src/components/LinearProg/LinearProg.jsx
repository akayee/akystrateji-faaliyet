import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid } from '@material-ui/core';
import Chart from 'react-apexcharts'


const LinearProg = props => {
    const options = {
        labels:props.gosterilecekalan
    }
    var options1 = {
        plotOptions: {
          radialBar: {
            dataLabels: {
              total: {
                show: true,
                label: 'TOPLAM',
                formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0) + '%'
                  }
              }
            }
          }
        },
        labels: ['1.', '2.','3.']
      };

const series = [props.gerceklesmeOrani, props.gerceklesmeOrani > 100 ? 0 : 100 - props.gerceklesmeOrani]
const parts=props.parts;


return <Grid container >
    {/* <Grid item xs={2}>
        %{props.gerceklesmeOrani}


    </Grid> */}
    <Grid item xs={12} style={{display:"flex", justifyContent:"flex-end"}} >
        {/* <LinearProgress variant="determinate" color={props.gerceklesmeOrani<70?'secondary':'primary'} value={props.gerceklesmeOrani>100?100:props.gerceklesmeOrani} /> */}
        <Chart options={options1} series={parts} type="radialBar" width={175} />
        <Chart options={options} series={series} type="donut" width={250} />
        
    </Grid>

</Grid>
}
export default LinearProg