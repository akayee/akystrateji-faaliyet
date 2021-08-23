import React from 'react';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";

class Yazilimlar extends React.Component{
    constructor(...args){
        super(...args)
        this.state={

        }
    }

    render () {

        return <div>
            <Button >Yeni Yazılım Ekle</Button>
          <Card  >
            <CardHeader>
              <b>Yazılımlar</b>
            </CardHeader>
            <CardBody>
                {this.props.yazilimlar&&this.props.yazilimlar.map((yazilim,index)=><div>
                  
                   {index+1 }-{yazilim.Adi} 
                
                </div>)}
            </CardBody>
          </Card>
        </div>
    }
}

export default Yazilimlar