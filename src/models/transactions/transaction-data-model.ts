export default class TransactionDataModel 
{
    timeStamp: string = "";
    amount: number = 0;
    hash: string = "";

    constructor(ts: string= "", amt: number = -1, hash: string= "-")
    {
        this.timeStamp = ts;
        this.amount = amt;
        this.hash = hash;
    }

    static listFromJson(json: any) : TransactionDataModel[]
    {
        let arr: TransactionDataModel[] = [];

        json.forEach( (tx: any) =>
        {
            arr.push(new TransactionDataModel(tx.ts, tx.amount, tx.txnHash))
        } )

        return arr;
    }
}