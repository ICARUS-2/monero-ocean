export default class PortEffortModel
{
    port: string;
    effort: number;

    constructor(port: string = "Pending", effort: number = -1)
    {
        this.port = port;
        this.effort = effort;
    }

    getEffortPercentage()
    {
        
    }
}