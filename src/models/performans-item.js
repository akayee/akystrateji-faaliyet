class PerformansItem{
    constructor(performansId,performansAdi,hedefId,amacId){
        this.performansId=performansId;
        this.adi=performansAdi;
        this.hedefId=hedefId;
        this.path=(amacId+1)+"/"+(hedefId+1)+"/"+performansId;

    }
};

export default PerformansItem