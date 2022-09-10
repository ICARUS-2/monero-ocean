export default class PortHashrateModel
{
    port: string;
    hashrate: string;

    constructor(port: string = "Pending", hashrate: string = "Pending")
    {
        this.port = port;
        this.hashrate = hashrate;
    }
}