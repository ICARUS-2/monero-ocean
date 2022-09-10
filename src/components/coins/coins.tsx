import React, {useEffect, useState} from 'react'
import { getDataByPort, getMoneroPort, getPortsArray } from '../../lib/coins'
import DependencyContainer from '../../lib/dependencies'
import HashrateConverter from '../../lib/hashrate-converter'
import LocalStorageHelper from '../../lib/local-storage-helper'
import SettingsHelper from '../../lib/settings-helper'
import NetworkStatsModel from '../../models/network-stats/network-stats-model'
import PoolStatsModel from '../../models/pool-stats/pool-stats-model'
import './coins.css'

const Coins = () => {
    
    const [poolStats, setPoolStats] = useState(new PoolStatsModel())
    const [networkStats, setNetworkStats] = useState(new NetworkStatsModel());

    useEffect( () =>
    {   
        fetchBlocks();

        let interval = setInterval(
            () =>
            {
              fetchBlocks();
            }, //if refresh rate is not found, set it to the default
            (LocalStorageHelper.getRefreshRate() === null ? 
              SettingsHelper.REFRESH_RATE_DEFAULT : 
              Number(LocalStorageHelper.getRefreshRate()) ) * 1000
          )

          return () =>
          {
            clearInterval(interval)
          }
    }, [])
    
    const fetchBlocks = async () =>
    {
        let poolResult = await DependencyContainer.moneroOceanClient.getPoolStats();
        let networkResult = await DependencyContainer.moneroOceanClient.getNetworkStats();

        if (poolResult != null && networkResult != null)
        {
            setPoolStats(poolResult);
            setNetworkStats(networkResult);
        }
    }

    return (
        <div className='coinReportContainer boxComponent'>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className=''>Coin</th>
                            <th className=''>Algorithm</th>
                            <th className=''>Port #</th>
                            <th className=''>Effort</th>
                            <th className=''>Miners</th>
                            <th className=''>Network Hashrate</th>
                            <th className=''>Pool Hashrate</th>
                            <th className=''>Blocks by Pool</th>
                            <th className=''>Blockchain Height</th>
                            <th className=''>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            getPortsArray().map( (port: string, index: number) =>
                                {
                                    let portData = getDataByPort(Number(port))

                                    let portName = portData.name;
                                    
                                    let algo = poolStats.getAlgoByPort(port)?.algorithm
                                    
                                    let effortPercentage = Number(poolStats.getEffortPercentage(port, networkStats));
                                    
                                    let minerCount = poolStats.getMinerCountByPort(port)?.minerCount
                                    
                                    let networkDiff = networkStats.getPortStatsByNumber(Number(port))?.difficulty;
                                    let hashrateUnit = portData.unit ? portData.unit : HashrateConverter.DEFAULT_UNIT
                                    let networkHashrate = HashrateConverter.diffToParsedHashrate(Number(port), networkDiff ? Number(networkDiff) : 1, hashrateUnit);
                                    
                                    let poolHashrate = poolStats.getHashrateByPort(port)?.hashrate
                                    if (!poolHashrate)
                                        poolHashrate = "0";
                                    
                                    let blocksFound = port === getMoneroPort().toString() ? poolStats.moneroBlocksFound : poolStats.getPoolBlocksByPort(port)?.amount;

                                    let blockchainHeight = networkStats.getPortStatsByNumber(Number(port))?.height

                                    let comment = poolStats.getCommentByPort(port);

                                    let colorBasedOnComment = `${comment === "" ? "lightGreenText" : "yellowText"}`;

                                    return (
                                        <tr key={index}>
                                            <td className={colorBasedOnComment}>{portName}</td>
                                            <td className={colorBasedOnComment}>{algo}</td>
                                            <td className={colorBasedOnComment}>{port}</td>
                                            <td className={`${effortPercentage <= 100 ? "limeText" : "redText"}`}>{effortPercentage}%</td>
                                            <td className={`${minerCount > 0 ? "limeText" : "redText"}`}>{minerCount}</td>
                                            <td className={colorBasedOnComment}>{networkHashrate}</td>
                                            <td className={`${Number(poolHashrate) > 0 ? "limeText" : "redText"}`}>{HashrateConverter.parseHashrate(poolHashrate)}</td>
                                            <td className={colorBasedOnComment}>{blocksFound}</td>
                                            <td className={colorBasedOnComment}>{blockchainHeight}</td>
                                            <td className={colorBasedOnComment}>{comment}</td>
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

export default Coins