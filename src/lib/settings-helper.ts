import LocalStorageHelper from "./local-storage-helper";

export default class SettingsHelper 
{
    static REFRESH_RATE_OPTIONS = [5, 15, 30, 60]
    static REFRESH_RATE_DEFAULT = SettingsHelper.REFRESH_RATE_OPTIONS[1];

    static CURRENCY_OPTIONS = ["usd", "eur", "btc"];
    static CURRENCY_OPTIONS_DEFAULT = SettingsHelper.CURRENCY_OPTIONS[0];

    static loadDefaultSettingsIntoStorage()
    {
        if (!LocalStorageHelper.getRefreshRate() 
        || isNaN(Number(LocalStorageHelper.getRefreshRate()))
        || !this.REFRESH_RATE_OPTIONS.includes(Number(LocalStorageHelper.getRefreshRate())))
        {
            LocalStorageHelper.setRefreshRate(this.REFRESH_RATE_DEFAULT);
        }
        
        if (!LocalStorageHelper.getCurrencyChoice())
        {
            LocalStorageHelper.setCurrencyChoice(this.CURRENCY_OPTIONS_DEFAULT);
        }
    }
}