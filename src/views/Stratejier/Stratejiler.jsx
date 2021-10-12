import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {  Grid } from '@material-ui/core';
import LinearProg from '../../components/LinearProg/LinearProg';
import { connect} from 'react-redux';
import { getStrategyData } from '../../store/actions/birimsstratejibilgiler'


class Stratejiler extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
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
    componentDidMount() {
        this.props.getStrategyData(2);
      }
    render() {

        const {stratejikAmac,hedefler,performanslar,isturleri,vmFaaliyetTurleri}= this.props.strategydata.strategydata;
        console.log(this.props.strategydata)

        return <div>
            {stratejikAmac&&stratejikAmac.map((strateji, index) => <Accordion key={index} expanded={this.state.expanded === strateji.path} onChange={this.handleChange(strateji.path)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    A{strateji.id + 1}:{strateji.adi}
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '%100' }}>
                        {hedefler.map((hedef, index) => <Accordion key={index} expanded={this.state.hedefexpanded === hedef.path} onChange={this.handleChangeHedef(hedef.path)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid xs={5}>H{strateji.id + 1}.{hedef.id + 1} : {hedef.tanim}</Grid>
                                <Grid xs={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{}</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ width: '%100' }}>
                                    {performanslar ? performanslar.map((performans, index) => <Accordion key={index} expanded={this.state.performansexpanded === performans.path} onChange={this.handleChangePerformans(performans.path)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid xs={5}>P{strateji.id + 1}.{hedef.id + 1}.{performans.id + 1} : {performans.adi}</Grid>
                                            <Grid xs={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{}</Grid>
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
                                                {isturleri && isturleri.map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={(is.toplamDeger*100/is.yillikHedef)} gosterilecekalan={["Performans","Faaliyet"]} parts={[is.firstPart,is.secondPart,is.thirdPart,is.lastPart]} /> </Grid>
                                                </Grid>)}
                                                <Grid container><h4><b>Faaliyetler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {vmFaaliyetTurleri && vmFaaliyetTurleri.map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{textAlign:'center'}}>{is.OlcuBrimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={(is.toplamDeger*100/is.yillikHedef)}  gosterilecekalan={["Performans","Faaliyet"]} parts={[is.firstPart,is.secondPart,is.thirdPart,is.lastPart]} /> </Grid>
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

const mapStateToProps = (state) => ({strategydata: state.strategydata })
export default connect(mapStateToProps, {getStrategyData })(Stratejiler);