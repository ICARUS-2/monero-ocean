import React, { useEffect, useState } from 'react'
import DependencyContainer from '../../lib/dependencies'
import "./exchange-rates.css"

const ExchangeRates = () => {

    const fetchData = async () => 
    {
        let result = await DependencyContainer.moneroOceanClient.getPoolStats();
        
        if (result)
        {
            setUsdPrice(result.price.usd)
            setEurPrice(result.price.eur)
            setBtcPrice(result.price.btc)
        }
        else
        {
            setErrorCallingApi(true)
        }
    }

    useEffect( () =>
    {
        fetchData();
    },[] )

    const [usdPrice, setUsdPrice] = useState<number>(NaN)
    const [eurPrice, setEurPrice] = useState<number>(NaN)
    const [btcPrice, setBtcPrice] = useState<number>(NaN)
    const [errorCallingApi, setErrorCallingApi] = useState<boolean>(false);

    return (
        <div className='exchangeRatesContainer'>
            <div className='m-2'></div>
            {errorCallingApi &&
                <div className="alert alert-danger">Error retrieving data</div>
            }
            <h1>Exchange Rates</h1>
            <div className='exchangeRatesInner boxComponent'>
                <div className='table-responsive'>
                    <table className='table exchangeRatesTable'>
                        <thead>
                            <tr>
                                <td className='lightGreenText'>Pairing</td>
                                <td className='lightGreenText'>Price</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='lightGreenText'>{"XMR -> USD"}</td>
                                <td className='lightGreenText'>${usdPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"XMR -> EUR"}</td>
                                <td className='lightGreenText'>€{eurPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"XMR -> BTC"}</td>
                                <td className='lightGreenText'>₿{btcPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"BTC -> USD"}</td>
                                <td className='lightGreenText'>${1 / btcPrice * usdPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"BTC -> EUR"}</td>
                                <td className='lightGreenText'>€{1 / btcPrice * eurPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"BTC -> XMR"}</td>
                                <td className='lightGreenText'>₿{1 / btcPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"USD -> EUR"}</td>
                                <td className='lightGreenText'>€{eurPrice / usdPrice}</td>
                            </tr>

                            <tr>
                                <td className='lightGreenText'>{"EUR -> USD"}</td>
                                <td className='lightGreenText'>${usdPrice / eurPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ExchangeRates