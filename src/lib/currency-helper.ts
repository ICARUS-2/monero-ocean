import PriceModel from "../models/pool-stats/price-model";
import { COINS, getMoneroPort } from "./coins";
import LocalStorageHelper from "./local-storage-helper";
import SettingsHelper from './settings-helper';

export default class CurrencyHelper
{
    static piconeroToMonero(rawAmount: number): string
    {
        if (isNaN(rawAmount))
            return "Pending"

        //@ts-ignore
        return rawAmount / COINS[getMoneroPort()].divisor
    }

    static applyDivisor(rawAmount: number, portNumber: number): string 
    {
        if (isNaN(rawAmount))
            return "Pending"

        //@ts-ignore
        return rawAmount / COINS[portNumber].divisor
    }


    static convertPiconeroToCurrency(priceModel: PriceModel, currency: string, piconeroAmount: number): string
    {
        let moneroAmount = Number(CurrencyHelper.piconeroToMonero(piconeroAmount));

        switch(currency)
        {
            case "usd":
                return "$"+(priceModel.usd * moneroAmount).toFixed(2);
            
            case "eur":
                return "€"+(priceModel.eur * moneroAmount).toFixed(2);

            case "btc":
                return "₿"+(priceModel.btc * moneroAmount).toFixed(8);;

            default:
                return "Currency Unavailable"
        }
    }

    static piconeroToSelectedCurrency(priceModel: PriceModel, piconeroAmount: number)
    {
        let selectedCurrency = LocalStorageHelper.getCurrencyChoice();

        if (selectedCurrency === null)
        {
            selectedCurrency = SettingsHelper.CURRENCY_OPTIONS_DEFAULT;
        }

        return CurrencyHelper.convertPiconeroToCurrency(priceModel, selectedCurrency, piconeroAmount)        
    }
}