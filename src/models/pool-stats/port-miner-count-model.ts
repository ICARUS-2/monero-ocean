export default class PortMinerCountModel
{
    port: string;
    minerCount: number;

    constructor(port: string = "", minerCount: number = -1)
    {
        this.port = port;
        this.minerCount = minerCount;
    }
}