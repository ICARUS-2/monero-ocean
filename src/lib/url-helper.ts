export default class ApiRoutes 
{
    static getBaseUrl(): string 
    {
        return "https://api.moneroocean.stream/"
    }

    static getNetworkStatsRoute(): string
    {
        return this.getBaseUrl() + "network/stats";
    }

    static getPoolStatsRoute(): string 
    {
        return this.getBaseUrl() + "pool/stats";
    }

    static getMinerStatsRoute(addr: string = ""): string 
    {
        return this.getBaseUrl() + "miner/" + addr + "/stats";
    }

    static getAllWorkersRoute(addr: string = ""): string 
    {
        return this.getMinerStatsRoute(addr) + "/allWorkers";
    }

    static getUserRoute(addr: string = ""): string 
    {
        return this.getBaseUrl() + "user/" + addr;
    }

    static getMoneroBlocksRoute(): string
    {
        return this.getBaseUrl() + "pool/blocks"
    }

    static getAltBlocksRoute(): string 
    {
        return this.getBaseUrl() + "pool/altblocks"
    }

    static getAltBlocksByPortRoute(portNumber: string = ""): string
    {
        return this.getBaseUrl() + "pool/coin_altblocks/" + portNumber
    }

    static getTransactionReportRoute(address: string)
    {
        return this.getBaseUrl() + "miner/"+address+"/payments"
    }
    
    static getUserBlockPaymentsRoute(address: string, pageNumber: number, count: number)
    {
        return this.getBaseUrl() + `miner/${address}/block_payments?page=${pageNumber}&limit=${count}`
    }

    static getConnectedMinersChartRoute()
    {
        return this.getBaseUrl() + "pool/chart/miners"
    }

    static getUserGlobalHashrateChartRoute(address: string)
    {
        return this.getBaseUrl() + `miner/${address}/chart/hashrate`
    }

    static getUpdateThresholdRoute()
    {
        return this.getBaseUrl() + `user/updateThreshold`
    }

    static getAllWorkersChartRoute(address: string)
    {
        return this.getUserGlobalHashrateChartRoute(address) + "/allworkers" 
    }
}