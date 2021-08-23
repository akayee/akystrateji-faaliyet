import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FizikselYapiEkle from './FizikselYapiEkle';

class FizikselYapi extends React.Component{
    constructor(...args){
        super(...args)
        this.state={
          fizikselyapilar:this.props.fizikselyapilar
        }
    }

    fizikselYapiEkle = (e,yapi)=>{
      
    }
    render () {

      const {fizikselyapilar} = this.state;
        return <div>
            <FizikselYapiEkle />
          <Card  >
            <CardHeader>
             <b>Yapı Listesi</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Konum</b></Grid> <Grid item xs={4}><b>m²</b></Grid>            
            </Grid>
            {fizikselyapilar && fizikselyapilar.map((fizikselyapi)=><Grid container justify="center" spacing={3}>
              <Grid item xs={4}>{fizikselyapi.Adi}</Grid>
              <Grid item xs={4}>{fizikselyapi.Konum} </Grid>
              <Grid item xs={4}>{fizikselyapi.MetreKare} </Grid>
            </Grid>)}
            </CardBody>
          </Card>
        </div>
    }
}

export default FizikselYapi