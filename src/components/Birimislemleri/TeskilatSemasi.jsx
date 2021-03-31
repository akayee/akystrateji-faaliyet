import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";

class TeskilatSemasi extends React.Component{
    constructor(...args){
        super(...args)
        this.state={

        }
    }

    render () {

        return <div>
           <Card  >
            <CardHeader>
              <b>Teşkilat Şeması</b>
            </CardHeader>
            <CardBody>
            </CardBody>
          </Card>
        </div>
    }
}

export default TeskilatSemasi