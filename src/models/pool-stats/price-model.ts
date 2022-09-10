export default class PriceModel
{
    usd: number;
    eur: number;
    btc: number;

    constructor(usd: number = -1, eur: number = -1, btc: number = -1)
    {
        this.usd = usd;
        this.eur = eur;
        this.btc = btc;
    }
}