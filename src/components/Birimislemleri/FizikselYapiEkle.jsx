import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class FizikselYapiEkle extends React.Component{
    constructor(...args){
        super(...args)
        this.state={

        }
    }

    render () {

        return <div>
            <Button >Fiziksel Yapı Ekle</Button>
        </div>
    }
}

export default FizikselYapiEkle