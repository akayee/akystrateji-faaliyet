import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import LinearProg from '../../components/LinearProg/LinearProgStrateji';
import { connect } from 'react-redux';
import { getFaaliyetData } from '../../store/actions/birimsstratejibilgiler';
import Divider from '../../components/Ui/Divider.js';
import Skeleton from 'react-loading-skeleton';


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
        this.props.getFaaliyetData();
    }

    render() {

        const { stratejikAmac, hedefler, performanslar, isturleri, vmFaaliyetTurleri } = this.props.strategydata;

        console.log(this.props.strategydata)
        if (this.props.loading == true) {
            return <div>
                <Skeleton height={100} />
                <Skeleton count={6} /></div>
        } else if (this.props.error == true) {
            return <div>
                <h1>Sistem Hatası</h1>
            </div>
        }

        return <div>
            {stratejikAmac && stratejikAmac.map((strateji, stratejindex) => <Accordion key={stratejindex} expanded={this.state.expanded === strateji.id} onChange={this.handleChange(strateji.id)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    A{stratejindex + 1}:{strateji.adi}
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '%100' }}>
                        {hedefler.filter(obj => obj.amaclarId == strateji.id).map((hedef, hedefindex) => <Accordion key={hedefindex} expanded={this.state.hedefexpanded === strateji.id + '/' + hedef.id} onChange={this.handleChangeHedef(strateji.id + '/' + hedef.id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid item xs={5}>H{stratejindex + 1}.{hedefindex + 1} : {hedef.tanim}</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ width: '%100' }}>
                                    {performanslar ? performanslar.filter(obj => obj.hedeflerId == hedef.id).map((performans, index) => <Accordion key={index} expanded={this.state.performansexpanded === strateji.id + '/' + hedef.id + '/' + performans.id} onChange={this.handleChangePerformans(strateji.id + '/' + hedef.id + '/' + performans.id)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Grid item xs={5}>P{stratejindex + 1}.{hedefindex + 1}.{index + 1} : {performans.adi}</Grid>
                                            <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                {
                                                    //birim && birim.find(obj=>obj.id ==isturleri.find(o=>o).birimId).adi 
                                                }
                                            </Grid>
                                            <Grid item xs={5}><LinearProg
                                                gerceklesmeOrani={isturleri.filter(obj => obj.performansId == performans.id).map(item => (item.toplamDeger * 100) / item.yillikHedef).reduce((prev, next) => prev + next, 0) / isturleri.length}
                                                yillikHedef={vmFaaliyetTurleri.filter(obj => obj.performansId == performans.id).map(item => (item.toplamDeger * 100) / item.yillikHedef).reduce((prev, next) => prev + next, 0) / isturleri.length}
                                                gosterilecekalan={["Faaliyet", "Maaliyet"]} /> </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid container><h4><b>Performans Göstergeleri</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2}><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {isturleri && isturleri.filter(obj => obj.performansId == performans.id).map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.toplamDeger}
                                                        yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                                                        parts={[((is.firstPart * 100) / is.yillikHedef), ((is.secondPart * 100) / is.yillikHedef),
                                                        ((is.thirdPart * 100) / is.yillikHedef), ((is.lastPart * 100) / is.yillikHedef)]}
                                                        gerceklesmeOrani={((is.toplamDeger * 100) / is.yillikHedef)} /> </Grid>
                                                    <Divider />
                                                </Grid>)}

                                                <Grid container><h4><b>Maaliyetler</b></h4></Grid>
                                                <Grid container>
                                                    <Grid item xs={2}><b>Adi</b></Grid>
                                                    <Grid item xs={2} ><b>Ölçü Birimi</b></Grid>
                                                    <Grid item xs={2}><b>Hedef</b> </Grid>
                                                    <Grid item xs={2}><b>Gerçekleşme</b> </Grid>
                                                    <Grid item xs={4}><b>Açıklama</b></Grid>
                                                </Grid>
                                                {vmFaaliyetTurleri && vmFaaliyetTurleri.filter(obj => obj.performansId == performans.id).map((is, index) => <Grid key={index} container>
                                                    <Grid item xs={2}>{is.adi}</Grid>
                                                    <Grid item xs={2} style={{ textAlign: 'center' }}>{is.olcuBirimi} </Grid>
                                                    <Grid item xs={2}>{is.yillikHedef} </Grid>
                                                    <Grid item xs={2}>{is.toplamDeger} </Grid>
                                                    <Grid item xs={4}>{is.aciklama} </Grid>
                                                    <Grid item xs={12}><LinearProg gerceklesmeOrani={is.toplamDeger}
                                                        yillikHedef={is.yillikHedef} gosterilecekalan={["Gerçekleşen", "Hedef"]}
                                                        parts={[(is.firstPart * 100) / is.yillikHedef,
                                                        (is.secondPart * 100) / is.yillikHedef, (is.thirdPart * 100) / is.yillikHedef, (is.lastPart * 100) / is.yillikHedef]}
                                                        gerceklesmeOrani={(is.toplamDeger * 100) / is.yillikHedef} /> </Grid>
                                                    <Divider />
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

const mapStateToProps = (state) => ({ strategydata: state.strategydata.faaliyetRaporu, loading: state.strategydata.loading, error: state.strategydata.error })
export default connect(mapStateToProps, { getFaaliyetData })(Stratejiler);