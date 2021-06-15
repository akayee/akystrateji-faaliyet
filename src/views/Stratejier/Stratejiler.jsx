import React from 'react'
import STRATEGYDATA from '../../data/dummydata';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {  Grid } from '@material-ui/core';
import BIRIMLER from '../../data/birimler';
import LinearProg from '../../components/LinearProg/LinearProg';
import { FullscreenExit } from '@material-ui/icons';
import { connect} from 'react-redux';


const mapStateToProps = state => {
    return{
      birimlerim: state.birimler
    }
}
class Stratejiler extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: STRATEGYDATA,
            expanded: false,
            hedefexpanded: false,
            performansexpanded: false
        }
    }
    handleChange = (panel) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };
    handleChangeHedef = (panel) => (event, isExpanded) => {
        this.setState({ hedefexpanded: isExpanded ? panel : false });
    };
    handleChangePerformans = (panel) => (event, isExpanded) => {
        this.setState({ performansexpanded: isExpanded ? panel : false });
    };
    render() {

        const birimlerim= this.props.birimlerim.birimler

        return <div>
            {this.state.data.map((strateji, index) => <Accordion expanded={this.state.expanded === strateji.path} onChange={this.handleChange(strateji.path)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    S{strateji.id + 1}:{strateji.adi}
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '%100' }}>
                        {strateji.hedefler.map((hedef, index) => <Accordion expanded={this.state.hedefexpanded === hedef.path} onChange={this.handleChangeHedef(hedef.path)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid xs={5}>S{strateji.id + 1}H{hedef.id + 1} : {hedef.adi}</Grid>
                                <Grid xs={5}><LinearProg gerceklesmeOrani={hedef.hedefGerceklesmeOrani} /></Grid>
                                <Grid xs={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{BIRIMLER[hedef.birimId].Adi}</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ width: '%100' }}>
                                    {hedef.performanslar ? hedef.performanslar.map((performans, index) => <Accordion expanded={this.state.performansexpanded === performans.path} onChange={this.handleChangePerformans(performans.path)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid xs={5}>S{strateji.id + 1}H{hedef.id + 1}P{performans.id + 1} : {performans.adi}</Grid>
                                            <Grid xs={5}><LinearProg gerceklesmeOrani={performans.gerceklesmeOrani} /></Grid>
                                            <Grid xs={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{BIRIMLER[performans.birimId].Adi}</Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid container><h4><b>İşler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2}><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {performans.isler && performans.isler.map((is, index) => <Grid container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.hedef} </Grid>
                                                    <Grid item xs={2}>{is.gerceklesme} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.gerceklesmeOrani} /> </Grid>
                                                </Grid>)}
                                                <Grid container><h4><b>Faaliyetler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {performans.isler && performans.faaliyetler.map((is, index) => <Grid container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.hedef} </Grid>
                                                    <Grid item xs={2}>{is.gerceklesme} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.gerceklesmeOrani} /> </Grid>
                                                </Grid>)}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>) : null}
                                </div>
                            </AccordionDetails>

                        </Accordion>)}

                    </div>

                </AccordionDetails>
            </Accordion>)}



        </div>
    }
}
export default connect(mapStateToProps)(Stratejiler);