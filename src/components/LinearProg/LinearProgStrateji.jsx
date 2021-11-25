import React from 'react';
import { Grid } from '@material-ui/core';
import Chart from 'react-apexcharts'


const LinearProgStrateji = props => {
  const options = {
    labels: props.gosterilecekalan
  }
  var options1 = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: 'TOPLAM',
            formatter: function (w) {
              if (!isNaN(w)) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return new Intl.NumberFormat('en-IN').format(a + b)
                }, 0) + '%'
              } else {
                return 'VERİ YOK'
              }

            }
          }
        }
      },

    },
    labels: ['1.', '2.', '3.']
  };

  const series = [isNaN(props.gerceklesmeOrani) ? 0 : props.gerceklesmeOrani, isNaN(props.yillikHedef) ? 0 : props.yillikHedef]
  const parts = props.parts;


  return <Grid container >
    {/* <Grid item xs={2}>
        %{props.gerceklesmeOrani}


    </Grid> */}
    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }} >
      {/* <LinearProgress variant="determinate" color={props.gerceklesmeOrani<70?'secondary':'primary'} value={props.gerceklesmeOrani>100?100:props.gerceklesmeOrani} /> */}
      {parts ? <Chart options={options1} series={parts} type="radialBar" width={175} /> : null}

      <Chart options={options} series={series} type="donut" width={250} />

    </Grid>

  </Grid>
}
export default LinearProgStrateji