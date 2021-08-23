import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class AracListesi extends React.Component{
    constructor(...args){
        super(...args)
        this.state={

        }
    }

    render () {

        return <div>
            <Button >Yeni Araç Ekle</Button>
          <Card  >
            <CardHeader>
             <b>Araç Listesi</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Adi</b></Grid> <Grid item xs={4}><b>Cinsi</b></Grid> <Grid item xs={4}><b>Sahiplenme Türü </b></Grid>
            </Grid>
                {this.props.araclar&&this.props.araclar.map((arac,index)=><Grid  container justify="center" spacing={3}>
                  
                    <Grid item xs={4}>{arac.Adi}</Grid> <Grid item xs={4}>{arac.Cinsi}</Grid> <Grid item xs={4}>{arac.SahiplikTuru} </Grid>
                
                    </Grid>)}
            </CardBody>
          </Card>
        </div>
    }
}

export default AracListesi