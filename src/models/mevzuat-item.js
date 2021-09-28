class MevzuatItem{
    constructor(id,adi,Tanim,Deleted,birimId){
        this.id=id;
        this.adi=adi;
        this.yonetmelik=Tanim;
        this.deleted=Deleted;
        this.birimId=birimId;
    }
};

export default MevzuatItem