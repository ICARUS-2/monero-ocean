export default class LocalStorageHelper
{
    static addressKey: string = "icarus-2_MoneroOceanAddress";

    static settingsRefreshRateKey: string = "icarus-2_MoneroOceanRefreshRate";

    static settingsCurrencyKey: string = "icarus-2_MoneroOceanCurrencyChoice";

    static getMoneroAddress(): string | null
    {
        return localStorage.getItem(LocalStorageHelper.addressKey);
    }
    
    static setMoneroAddress(moneroAddress: string): void 
    {
        localStorage.setItem(LocalStorageHelper.addressKey, moneroAddress)
    }

    static removeMoneroAddress(): void
    {
        localStorage.removeItem(LocalStorageHelper.addressKey);
    }

    static getRefreshRate(): string | null 
    {
        return localStorage.getItem(LocalStorageHelper.settingsRefreshRateKey)
    }

    static setRefreshRate(time: number) : void
    {
        localStorage.setItem(LocalStorageHelper.settingsRefreshRateKey, time.toString())
    }

    static getCurrencyChoice(): string | null
    {
        return localStorage.getItem(LocalStorageHelper.settingsCurrencyKey);     
    }

    static setCurrencyChoice(currency: string): void
    {
        localStorage.setItem(LocalStorageHelper.settingsCurrencyKey, currency);
    }
}