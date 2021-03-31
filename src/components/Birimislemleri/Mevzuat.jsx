import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class Mevzuat extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {

        }
    }

    render() {

        return <div>
            <Button >Mevzuat Ekle</Button>
          <Card  >
            <CardHeader>
             <b>İlgili Mevzuatlar</b> 
            </CardHeader>
            <CardBody>
            <Grid  container justify="center" spacing={3}>
            <Grid item xs={4}><b>Yönetmelik</b></Grid> <Grid item xs={4}><b>Tanım</b></Grid> 
            </Grid>
            </CardBody>
          </Card>
        </div>
    }
}

export default Mevzuat