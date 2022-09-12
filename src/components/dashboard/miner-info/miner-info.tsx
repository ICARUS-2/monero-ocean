import React from 'react'
import './miner-info.css'
import { useState } from 'react'
import AllWorkersModel from '../../../models/miner-stats/all-workers-model';
import IndividualMinerModel from '../../../models/miner-stats/individual-miner-model';
import HashrateConverter from '../../../lib/hashrate-converter';
import { Link } from 'react-router-dom';
import SiteRoutes from '../../../lib/site-routes';

class Props 
{
    miner: AllWorkersModel = new AllWorkersModel();
}

const MinerInfo = ({miner} : Props) => {

    return (
    <div className='minerInfoContainer dashboardBoxComponent scrollbar'>
        <div className='statHeader minerInfoHeader'>
            <span>Miner Info</span>
            <Link to={SiteRoutes.getAllWorkersChartRoute()} className="boxButton">Chart - All Workers</Link>
        </div>
        <div className='statText'>Total Shares: ({miner.totalSharesAccepted}/{miner.totalSharesRejected})</div>
        
        <br />
        
        <table className='table table-borderless minerTable'>
            <thead>
                <tr>
                    <th>Miner ID</th>
                    <th>Hashrate (P/R)</th>
                    <th>Shares</th>
                </tr>
            </thead>

            <tbody>
                {
                    miner.miners.map( (m: IndividualMinerModel, index: number) =>
                    {
                        return (
                        <tr key={index}>
                            <td className='statText'>{m.id}</td>
                            <td className='statText'>{HashrateConverter.parseHashrate(m.payHashrate) + "  /  "+ HashrateConverter.parseHashrate(m.rawHashrate)}</td>
                            <td className='statText'>{m.sharesAccepted} / {m.sharesRejected}</td>
                        </tr>
                        )
                    } )
                }
            </tbody>
        </table>
    </div>
  )
}

export default MinerInfo