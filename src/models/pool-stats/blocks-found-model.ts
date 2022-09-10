export default class BlocksFoundModel
{
    port: string;
    amount: number;

    constructor(port: string = "Pending", amount: number = -1)
    {
        this.port = port;
        this.amount = amount;
    }
}