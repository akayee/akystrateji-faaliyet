import React from 'react';
import { connect } from 'react-redux';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from 'material-table';
import Card from "components/Card/Card.jsx";
import { getPersonelData,removeFromPersoneller} from '../../store/actions/birimislemleri/personeller';
import Grid from '@material-ui/core/Grid';
import PersonelEkle from './Add/PersonelEkle';
import Swal from 'sweetalert2';
import PersonelGuncelle from './Update/PersonelGuncelle';


class PersonelListesi extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      personelcolumns: [
        { title: 'Adı', field: 'adi' },
        { title: 'Kadro', field: 'kadro',lookup:this.props.personeller.kadro },
        { title: 'Mezuniyet', field: 'mezuniyet',lookup:this.props.personeller.mezuniyet },
        { title: 'Birim', field: 'birimId',lookup:this.props.personeller,render: rowData=>this.props.birimler&&this.props.birimler[this.props.birimler.findIndex(obj=>obj.id==rowData.birimId)].adi||null },
        {
          title: 'Cinsiyet', field: 'cinsiyet', render : rowData=>rowData.cinsiyet ==true ?<div>Erkek</div>:<div>Kadın</div>
        }
      ],
      openMenuGuncelle:false,
      editData:{}
    }
  }
  componentDidMount() {
    let BirimId = 2;
    this.props.getPersonelData(BirimId);
    if (this.props.error != true) {
        this.setState({
            isLoading: true
        })
    } else {
        this.setState({
            isLoading: true
        })
    }
}

handleModalOpenGuncelle = () => {
  this.setState({
      openMenuGuncelle: !this.state.openMenuGuncelle
  })
}
  render() {
    
    const { birimler } = this.props;
    return <div>
      <PersonelEkle props={this.props} />
      <GridContainer>
        <Grid item xs={12} >
          <Card>
            <MaterialTable
              title="Personel Listesi"
              columns={this.state.personelcolumns}
              data={this.props.personeller.personeller}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Sil',
                  onClick: (event, rowData) => {

                    Swal.fire({
                      title: 'Silmek istediğinize emin misiniz?',
                      showDenyButton: true,
                      confirmButtonText: 'Sil',
                      denyButtonText: `İptal`,
                  }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                          Swal.fire('Silme işlemi başarılı!', '', 'success')
                          this.props.removeFromPersoneller(rowData);
                      } else if (result.isDenied) {
                          Swal.fire('Silme işlemi iptal edildi', '', 'info')
                      }
                  })
                  }
                },
                {
                  icon: 'edit',
                  tooltip: 'Düzenle',
                  onClick: (event, rowData) => {
                    this.setState({
                      editData:rowData,
                      openMenuGuncelle: true,
                    })
                  }
                }
              ]}
              options={{
                actionsColumnIndex: -1
              }}

              detailPanel={rowData => {
                return (
                  <div style={{ width: "100%", marginLeft: "5rem" }} >
                    <GridContainer alignItems='center' justify='center'>
                      <GridItem md={3}>
                        <b>İşe Giriş Tarihi</b>
                      </GridItem>
                      <GridItem  md={3}>
                        <b>Unvan</b>
                      </GridItem>
                      <GridItem md={3}>
                        <b>Doğum Tarihi</b>
                      </GridItem>
                      <GridItem md={3}>
                        <b>Kısa Kod</b>
                      </GridItem>
                    </GridContainer>

                    <GridContainer alignItems='center' justify='center'>
                      <GridItem md={3}>
                        {new Date(rowData.iseGirisTarihi).toLocaleDateString('tr-TR')}
                      </GridItem>
                      <GridItem md={3}>
                        {this.props.personeller.unvan[rowData.unvan]}
                      </GridItem>                      
                      <GridItem md={3}>
                        {new Date(rowData.dogumTarihi).toLocaleDateString('tr-TR')}
                      </GridItem><GridItem md={3}>
                        {rowData.tel}
                      </GridItem>
                    </GridContainer>
                  </div>
                )
              }}
            />
          </Card>
          <PersonelGuncelle  open={this.state.openMenuGuncelle} personel={this.state.editData} birimler={birimler} handleModalOpenGuncelle={this.handleModalOpenGuncelle} />
        </Grid>
      </GridContainer>
    </div>
  }
}

const mapStateToProps = (state) => ({ personeller: state.personeller, error: state.personeller.error })
export default connect(mapStateToProps, { getPersonelData,removeFromPersoneller })(PersonelListesi)