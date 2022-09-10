export default class MinerStatsModel
{
    payHashrate: string = "Pending"; //hash2
    rawHashrate: string = "Pending"; //hash
    identifier: string = "Pending";
    lastHash: string = "Pending";
    totalHashes: string = "Pending";
    validShares: string = "Pending";
    invalidShares: string = "Pending";
    amountPaid: string = "Pending";
    amountDue: string = "Pending";
    transactionCount: string = "Pending";
    
    static fromJson(json: any): MinerStatsModel
    {
        let model = new MinerStatsModel()

        model.payHashrate = json.hash2;
        model.rawHashrate = json.hash;
        model.identifier = json.identifier;
        model.totalHashes = json.totalHashes;
        model.validShares = json.validShares;
        model.invalidShares = json.invalidShares;
        model.amountPaid = json.amtPaid;
        model.amountDue = json.amtDue;
        model.transactionCount = json.txnCount;
        
        return model;
    }
}