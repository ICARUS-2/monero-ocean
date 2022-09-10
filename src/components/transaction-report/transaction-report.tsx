import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrencyHelper from '../../lib/currency-helper'
import DateTimeFormatter from '../../lib/datetime-formatter'
import DependencyContainer from '../../lib/dependencies'
import LocalStorageHelper from '../../lib/local-storage-helper'
import SiteRoutes from '../../lib/site-routes'
import TransactionDataModel from '../../models/transactions/transaction-data-model'
import './transaction-report.css'

const TransactionReport = () => {

    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<TransactionDataModel[]>([]);
    const [totalXmrPaid, setTotalXmrPaid] = useState<number>(0);
    const [errorCallingApi, setErrorCallingApi] = useState<boolean>(false);

    const fetchTransactions = async() =>
    {
        let userAddress = LocalStorageHelper.getMoneroAddress();
        if (userAddress != null)
        {
            let result = await DependencyContainer.moneroOceanClient.getTransactionsForUser(userAddress);
            
            if (result != null)
            {
                setTransactions(result);
                setErrorCallingApi(false);
            }
            else
            {
                setErrorCallingApi(true);
            }
        }
    }

    useEffect( () =>
    {
        if (LocalStorageHelper.getMoneroAddress() != null)
        {
            fetchTransactions();
        }
        else 
        {
            navigate(SiteRoutes.getErrorRoute());
        }
    }, [] )

    useEffect( () =>
    {
        let amt: number = 0;

        transactions.forEach( tx =>
            {
                amt += tx.amount;
            } )

        setTotalXmrPaid(amt)
    }, [transactions])

    return (
    <div className='transactionReportContainer'>
        <div className='m-4'></div>
        {errorCallingApi &&
            <div className='alert alert-danger'>Error retrieving data</div>
        }
        <h4>Payments: {transactions.length} {"->"} Total XMR Paid: {CurrencyHelper.piconeroToMonero(totalXmrPaid)}</h4>
        <div className='m-4'></div>    

        <div className='transactionReportInner boxComponent table-responsive'>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='statText'>Timestamp</th>
                        <th className='statText'>Amount Paid (XMR)</th>
                        <th className='statText'>Transaction Hash</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map( (tx: TransactionDataModel, index: number) =>
                        {
                            return (
                                <tr key={index}>
                                    <td className='lightGreenText'>{DateTimeFormatter.UnixTSToDateLong(Number(tx.timeStamp))}</td>
                                    <td className='lightGreenText'>{CurrencyHelper.piconeroToMonero(tx.amount)}</td>
                                    <td className='lightGreenText'><a className='txReportExplorerLink' href={'https://xmrchain.net/tx/'+tx.hash}>{tx.hash}</a></td>
                                </tr>
                            )
                        } )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TransactionReport