import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid } from '@material-ui/core';

const LinearProg = props =>{

    return <Grid container style={{alignItems:'center',marginLeft:0}}>
        <Grid item xs={2}> %{props.gerceklesmeOrani}</Grid> 
        <Grid item xs={10} style={{paddingLeft:0}} >
            <LinearProgress variant="determinate" color={props.gerceklesmeOrani<70?'secondary':'primary'} value={props.gerceklesmeOrani>100?100:props.gerceklesmeOrani} />
        </Grid>
        
    </Grid>
}
export default LinearProg