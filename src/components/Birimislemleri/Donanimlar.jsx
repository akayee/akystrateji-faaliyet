import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class Donanimlar extends React.Component{
    constructor(...args){
        super(...args)
        this.state={

        }
    }

    render () {

        return <div>
            <Button >Yeni Donanım Ekle</Button>
        <Card  >
          <CardHeader>
            <b>Donanımlar</b>
          </CardHeader>
          <CardBody>
              {this.props.donanimlar.map((donanim,index)=><Grid  container justify="center" spacing={3}>
                
                <Grid item xs={6}>{donanim.Adi}</Grid> <Grid item xs={6}>{donanim.Adet}</Grid> 
            
                </Grid>)}
          </CardBody>
        </Card>
        </div>      
        
    }
}

export default Donanimlar