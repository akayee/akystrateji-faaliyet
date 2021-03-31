import React from 'react';


import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from 'material-table';
import Card from "components/Card/Card.jsx";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';


class PersonelListesi extends React.Component{
    constructor(...args){
        super(...args)
        this.state={
            personelcolumns: [
                { title: 'Adı', field: 'Adi' },
                { title: 'Kadro', field: 'kadro' },
                { title: 'Mezuniyet', field: 'Mezuniyet' },
                { title: 'Birim', field: 'Birim' },
                {
                  title: 'Üst Birim',
                  field: 'ustBirimId',
                  lookup: { 0: 'Fen İşleri', 1: 'Emlak İstimlak',2:'Çevre Koruma',3:'Zabıta',4:'Bilgi İşlem' },
                },
                {
                  title:'Cinsiyet',field:'cinsiyet'
                }
              ],
        }
    }

    render(){

        return<div>
            <Button >Yeni Personel Ekle</Button>
        <GridContainer>
        <Grid item xs={12} >
          <Card>
          <MaterialTable
          title="Personel Listesi"
          columns={this.state.personelcolumns}
          data={this.props.personeller}
          actions={[            
            {
              icon: 'delete',
              tooltip: 'Sil',
              onClick: (event, rowData) => {
            }
            },
            {
                icon: 'edit',
                tooltip: 'Düzenle',
                onClick: (event, rowData) => {
              }
              }
          ]} 
          options={{
            actionsColumnIndex: -1
          }}

          detailPanel={rowData => {
            return (
              <div style={{width:"100%", marginLeft:"5rem"}} >
                <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>İşe Giriş Tarihi</b>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>Unvan</b>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <b>Doğum Tarihi</b>
                  </GridItem>
                </GridContainer>
                
                  <GridContainer alignItems='center' justify='center'>
                  <GridItem xs={4} sm={4} md={4}>
                    {rowData.girisTarihi}
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    {rowData.gorevi}
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    {rowData.dogumTarihi}
                  </GridItem>
                  </GridContainer>
                
                
              </div>
            )
          }}
          
        />
          
         
          </Card>
          </Grid>
          
          
        </GridContainer>
        </div>
    }
}

export default PersonelListesi