export default class SiteRoutes
{
    static getBaseRoute(): string
    {
        return "/monero-ocean"
    }

    static getLoginRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/login"
    }

    static getDashboardRoute(): string
    {
        return SiteRoutes.getBaseRoute() + "/dashboard"
    }

    static getErrorRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/error"
    }

    static getSettingsRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/settings"
    }

    static getCoinsRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/coins"      
    }

    static getUserTransactionReportRoute(): string
    {
        return SiteRoutes.getBaseRoute() + "/user-transaction-report"
    }

    static getUserBlockPaymentsRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/user-block-payments"
    }

    static getUpdateThresholdRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/update-threshold"
    }

    static getExchangeRatesRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/exchange-rates"
    }

    static getConnectedMinersChartRoute(): string 
    {
        return SiteRoutes.getBaseRoute() + "/connected-miners"
    }

    static getUserGlobalHashrateChartRoute(): string
    {
        return SiteRoutes.getBaseRoute() + "/miner-hashrates"
    }
}