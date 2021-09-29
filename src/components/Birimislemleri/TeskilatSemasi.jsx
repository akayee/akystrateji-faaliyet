import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import PersonIcon from '@material-ui/icons/Person';
import { Button } from "@material-ui/core";

class TeskilatSemasi extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {

    }
  }

  render() {
    const { birimler, personeller } = this.props;
    return <div>
      <Card  >
        <CardHeader>
          <b>Teşkilat Şeması</b>
        </CardHeader>
        <CardBody >
          <Card >
            <CardBody>
              {personeller.personeller.some(obj => obj.unvan == 3) ? <Grid
                justifyContent="center"
                alignItems="center" container spacing={2}>
                <Card>
                  <b>Daire Başkanı</b>
                  <CardBody>

                    <Grid container spacing={2}>
                      {personeller.personeller.filter(obj => obj.unvan == 3).map((baskan, index) => <Grid item> <Card key={index} style={{alignItems:'center'}}>
                          <PersonIcon />
                          {baskan.adi}
                        </Card> </Grid>)}
                    </Grid>
                  </CardBody>
                </Card>
              </Grid> : null}
              {personeller.personeller.some(obj => obj.unvan == 2) ? <Grid  container spacing={2}>
                <Card>
                  <b>Şube Müdürü</b>
                  <CardBody>
                    <Grid container spacing={2}>
                      {personeller.personeller.filter(obj => obj.unvan == 2).map((mudur, index) => <Grid item > <Card key={index} style={{alignItems:'center'}} >
                        <PersonIcon />
                        {mudur.adi}
                      </Card> </Grid>)}
                    </Grid>
                  </CardBody>
                </Card>
              </Grid> : null}
              {personeller.personeller.some(obj => obj.unvan == 1) ? <Grid container spacing={2}>
                <Card>
                  <b>Şef</b>
                  <CardBody>
                    <Grid container spacing={2}>
                      {personeller.personeller.filter(obj => obj.unvan == 1).map((sef, index) => <Grid item> <Card key={index} style={{alignItems:'center'}}>
                        <PersonIcon />
                        {sef.adi}
                      </Card> </Grid>)}
                    </Grid>
                  </CardBody>
                </Card>
              </Grid> : null}
              <Card>
                <b>Personeller</b>
                <CardBody>

                  <Grid container spacing={2}>
                    {personeller.personeller.filter(obj => obj.unvan == 0).map((personel, index) => <Grid item> <Card key={index} style={{alignItems:'center'}}>
                      <PersonIcon />
                      {personel.adi}
                    </Card> </Grid>)}
                  </Grid>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  }
}

const mapStateToProps = (state) => ({ personeller: state.personeller })
export default connect(mapStateToProps, {})(TeskilatSemasi)