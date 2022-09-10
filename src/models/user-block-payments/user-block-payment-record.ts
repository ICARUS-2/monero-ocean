export default class UserBlockPaymentRecord 
{
    index: number;
    paid: number;
    found: number;
    port: number;
    hash: string;
    blockRewardPercentage: number;
    xmrValue: number;

    constructor(
        index: number, 
        paid: number, 
        found: number, 
        port: number, 
        hash: string, 
        blockRewardPercentage: number,
        xmrValue: number)
    {
        this.index = index;
        this.paid = paid;
        this.found = found;
        this.port = port;
        this.hash = hash;
        this.blockRewardPercentage = blockRewardPercentage;
        this.xmrValue = xmrValue;
    }

    static listFromJson(json: any) : UserBlockPaymentRecord[]
    {
        return json.map( (entry:any) =>
            {
                return new UserBlockPaymentRecord(
                    entry.id,
                    entry.ts,
                    entry.ts_found,
                    entry.port,
                    entry.hash,
                    entry.value_percent,
                    entry.value
                )
            } )
    }
}