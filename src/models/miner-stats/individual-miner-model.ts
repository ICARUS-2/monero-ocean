export default class IndividualMinerModel
{
    id: string;
    payHashrate: string;
    rawHashrate: string;
    sharesAccepted: number;
    sharesRejected: number;

    constructor(id: string = "Miner ID",payHashrate: string = "Pay Hashrate", rawHashrate="Raw Hashrate", sharesAcc: number = -1, sharesRej: number = -1)
    {
        this.id = id;
        this.payHashrate = payHashrate;
        this.rawHashrate = rawHashrate;
        this.sharesAccepted = sharesAcc;
        this.sharesRejected = sharesRej;
    }
}