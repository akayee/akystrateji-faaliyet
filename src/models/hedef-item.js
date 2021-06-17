class HedefItem{
    constructor(hedefId,hedefAdi,amacId){
        this.hedefId=hedefId;
        this.adi=hedefAdi;
        this.amacId=amacId;
        this.path=(amacId+1)+"/"+hedefId;

    }
};

export default HedefItem