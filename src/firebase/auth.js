import { ref, firebaseAuth } from './constants'

export function auth (email, pw,firmname) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((e)=> saveUser(e,firmname))
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}
export function currentUser(){
  return firebaseAuth().currentUser
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

//Kullanıcı oluşturulunca otomatik çalışan fonksiyon
//DİKKAT Depo ve Banka Hesabı push ile atılmalı firmname ile değil Düzelttim kontrol et
export function saveUser (user,firmname) {
  
    //Başlangıç Depoyu oluşturur
    
    let storeid=ref.child(`users/${user.user.uid}/Depolar/`)
    .push().key;
    storeid.set({Adi:firmname,id:storeid})

    //Başlangıç Hesabını oluşturur
    let accountid=ref.child(`users/${user.user.uid}/Hesaplar/`)
    .push().key;
    accountid.set({
      Tanim:firmname,
      HesapTuru:"0",
      Stok:"0",
      id:accountid});
    
    
  return ref.child(`users/${user.user.uid}/info`)
    .set({
      email: user.user.email,
      uid: user.user.uid,
      firmname:firmname
    })
    .then(() => user)
}
//Adding Data Function
export function addData(user,data,table){
  let id= ref.child(`users/${user.uid}/${table}`)
  .push().key;
  data.id=id;
  console.log(data)
  return ref.child(`users/${user.uid}/${table}/${id}`)
    .set(data)
}
//Adding Data Function
export function addMultipleData(user,data,table){

  return ref.child(`users/${user.uid}/${table}`)
    .set(data)
}

//Adding Invoice Data Function
export function addInvoiceData(user,data,table){
  let id= ref.child(`users/${user.uid}/${table}`)
  .push().key;
  //Buraya vergi hesaplamaları ve fatura oluşturulacak
  let total=0;
  let iskonto=0;
  let tax=0;
  let satisKDV=0;
  let alisKDV=0;
  let gelirVergisi=0;
  let totalSales=0;
  let inputOrOutput=false;
  console.log(data)
  data.allProducts.map(item=>{
    
    Object.keys(data.invoice).map((key,index)=>{
     
      
      if(key===item.UrunAciklama){
        total=total+(item.SatisFiyat*data.invoice[key])
        
      }

    }) 
    });
  
  
    let productSale=[]
    data.allProducts.map(item=>{
      if(item.SatisIskontoOrani)
      {
        productSale=productSale.concat(item.SatisIskontOrani)
      }
    })
    if(data.whom[0].Iskonto || productSale || data.invoice.Sale)
    {
      
    
      if(data.whom.Iskonto)
      {
        iskonto=iskonto+total*data.whom.Iskonto/100;

      }
      if(productSale.length>0)
      {
        data.allProducts.map(item=> { 
          //İskonto her ürün için ayrı ayrı hesaplanıyor. Ürünün indirimli fiyatı normal fiyat alanına eşitleniyor. Verginin indirimli fiyat üzerinden hesaplanması için.
          iskonto=iskonto+item.SatisFiyat*item.SatisIskontoOrani/100;
          
          item.IndirimsizFiyat=item.SatisFiyat;
          item.SatisFiyat=item.SatisFiyat-item.SatisFiyat*item.SatisIskontoOrani/100;
          
        })
      }
      

    }
  
    if(data.whom[0].TedarikciOrMusteri==="1" ){
      inputOrOutput=true;
      
      
      data.whom[0].GuncelBakiye= data.whom[0].GuncelBakiye-total;
      
      Object.keys(data.invoice).map((key1,index)=>{
      data.allProducts.map(item=>{         
        data.stores.map(depo=> {  
            let stokchange=0;   

              depo.Urunler&&Object.keys(depo.Urunler).map((key,index)=>{
              if(depo.Urunler[key].Adi==key1){
                stokchange=data.invoice[key1];
                //addProductData(user,depo.Urunler[key],"Depolar",stokchange)
                    
               
                
              }
            })

           
          })

          if(item.SatisKDVOrani>0)
          {
            if(!data.whom[0].VergidenMuaf){            
                satisKDV=((data.invoice[key1]*item.SatisFiyat)*item.SatisKDVOrani)/100;
                if(key1===item.UrunAciklama)
                {
                  if(satisKDV>0){
                    tax=tax+satisKDV;
                    total+=satisKDV;
                    satisKDV=0;
                  }

                }
            }
          }
       }) 
       //Vergilerden sonra fatura altı iskonto işlemi
       if(key1=='Sale')
      {
        iskonto=iskonto+total*data.invoice[key1]/100;
        
      }

      })
        
        
    }else{
      inputOrOutput=false;
      
      Object.keys(data.invoice).map((key1,index)=>{
        data.allProducts.map(item=>{ 
        
          data.stores.map(depo=> {
          let stokchange=0;
              
            depo.Urunler&&Object.keys(depo.Urunler).map((key,index)=>{
              if(depo.Urunler[key].Adi==key1){
                stokchange=data.invoice[key1];
                //addProductData(user,depo.Urunler[key],"Depolar",stokchange)              
             }
            })

          })
          if(item.SatisKDVOrani>0)
          {
            if(!data.whom[0].VergidenMuaf){            
                satisKDV=((data.invoice[key1]*item.SatisFiyat)*item.SatisKDVOrani)/100;
                if(key1===item.UrunAciklama)
                {
                  if(satisKDV>0){
                    tax=tax+satisKDV;
                    total+=satisKDV;
                    satisKDV=0;
                  }

                }
            }
          }
        }) 
         //Vergilerden sonra fatura altı iskonto işlemi
       if(key1=='sale')
       {
         iskonto=iskonto+total*data.invoice[key1]/100;
         tax=tax-tax*data.invoice[key1]/100;
         
       }
       if(key1=='description')
       {
         
        confirmedData={...confirmedData,aciklama:data.invoice[key1]};
       }
      })
        

    }     
    satisKDV=tax; 
    total-=iskonto;
    totalSales=totalSales+total;
    if(totalSales<85000)
    {
      gelirVergisi=0;
    }

  let confirmedData={};
  //Depoların idlerini array formatına getiren işlem
  let store=[];
  data.stores.map(i=>(store.push(i.id)))
  
  //Urunleri ve adetlerini id:adet olacak şekilde products arrayine atan işlem
  let product=[];
  data.allProducts.map(i=>(
    Object.keys(data["invoice"]).map((key,index)=>{
      if(key===i.UrunAciklama)
      {
        //DİKKAT değiştirdim dene
        product.push({"id":i.id,
        "count":data["invoice"][key]})
      }
     })))
  
  
  
  confirmedData["whom"]=data.whom[0].id;
  confirmedData["stores"]=store;
  confirmedData["products"]=product;
  confirmedData={...confirmedData,total};  
  confirmedData={...confirmedData,tax};
  confirmedData={...confirmedData,iskonto,inputOrOutput,id};
  let date=new Date();
  data["firminfo"]={...data["firminfo"],totalSales,satisKDV,alisKDV,gelirVergisi,year:date.getFullYear()};  
  confirmedData={...confirmedData,date:date.toISOString()}
  let bakiye=0;
  bakiye=parseInt(data.whom[0].GuncelBakiye)+parseInt(total);
  data.whom[0]={...data.whom[0],GuncelBakiye:bakiye}
  
  updateData(user,data.whom[0],"whom");
  if(data.firmInfo.totalSales>0)
  {    
    updateFirmData(user,data.firmInfo,data.firminfo,`firmInfo`);
    
  }else{   
  addInfoData(user,data.firminfo,`firmInfo/${data.firminfo.year}/`);
  }
  
  console.log(data)
  console.log(confirmedData)
  return ref.child(`users/${user.uid}/${table}/${id}`)
    .set(confirmedData)
}
//Reading Data Function
export function takeData(user,table){
  return ref.child(`users/${user.uid}/${table}`).once("value");

}
//Reading Data Function
export function takeSingleData(user,table,id){
  return ref.child(`users/${user.uid}/${table}/${id}`).once("value");

}
//Update Data Function
export function updateData(user,data,table){
  let id= ref.child(`users/${user.uid}/${table}`)
  .child(data.id);
  id.set(data);
    
}

//Delete Data Function
export function deleteData(user,data,table){
  let id= ref.child(`users/${user.uid}/${table}`)
  .child(data.id);
  id.remove();
    
}
//Adding Product Data Function
export function addProductData(user,data,table,count){
  let id= ref.child(`users/${user.uid}/${table}`)
  .push().key;
  data.id=id;
  //depodaki ürün sayısı data.productCount ile fonksiyona gelir. count parametresi eklenecek/çıkarılacak olan sayıyı temsil eder
  let date=new Date();
  ref.child(`users/${user.uid}/Depolar/${data.Depolar}/Urunler/`)
    .push({id:data.id,Adi:data.UrunAciklama,Stok:data.productCount,date:date.toISOString()});
  return ref.child(`users/${user.uid}/${table}/${id}`)
    .set(data)
}
//Adding Firm Data Function data var olan veridir. Yapılan işlemdeki total veriler ise data1 ile gelir ve dataya eklenir.
//DİKKAT Firma bilgileri nasıl çağırılıyor?
//DİKKAT yıl yıl veriler ayrılmalı
export function updateFirmData(user,data,data1,table){
  let id= ref.child(`users/${user.uid}/${table}/${data1.year}`)
  data.totalSales=data.totalSales+data1.totalSales;
  data.satisKDV+=data1.satisKDV;
  data.alisKDV+=data1.alisKDV;
  data.gelirVergisi+=data1.gelirVergisi;
  return ref.child(`users/${user.uid}/${table}/${id}`)
    .set(data)
}
//Adding Data Function
export function addInfoData(user,data,table){
  let id= ref.child(`users/${user.uid}/${table}`).push().key
  return ref.child(`users/${user.uid}/${table}/`)
    .set(data)
}

//Odeme Tahsilat ve hesap aktiviteleri //
export function addPaymentData(user,data,aciklama,count,isPayment){
  let id= ref.child(`users/${user.uid}/Hesaplar/${data.id}/AccountActivities`)
  let date=new Date();
  let tahsilat={
    aciklama,
    isPayment,
    id:id.push().key,
    whom:data.whom,
    count,
    date:date.toISOString()};
    let Stok=data.Stok
  if(isPayment){
    Stok-=count;
  }else
  {    
    Stok=parseInt(Stok)+parseInt(count);
  }
  data={...data,Stok};
  ref.child(`users/${user.uid}/Hesaplar/${data.id}`)
    .set(data);    
  id.push(tahsilat);
}
//Hesaplar arası para transferi
export function moneyTransfer(user,data1,data2,aciklama,count){
  addPaymentData(user,data1[0],aciklama,count,true);
  addPaymentData(user,data2[0],aciklama,count,false);
  
}


