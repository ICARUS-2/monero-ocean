import {useState, useEffect} from 'react'
import './main-dashboard.css'
import TopBox from '../top-box/top-box'
import InfoWithChart from '../info-with-chart/info-with-chart'
import DashboardStatuses from './../statuses/statuses';
import RecentBlockData from '../recent-block-data/recent-block-data';
import TripleStat from '../triple-stat/triple-stat';
import ButtonLinkModel from '../../../models/button-link-model';
import MinerInfo from '../miner-info/miner-info';
import TestMoneroOceanClient from '../../../lib/monero-ocean-client/test-monero-ocean-client';
import DependencyContainer from '../../../lib/dependencies';
import NetworkStatsModel from '../../../models/network-stats/network-stats-model';
import HashrateConverter from '../../../lib/hashrate-converter';
import PoolStatsModel from '../../../models/pool-stats/pool-stats-model';
import { useNavigate } from 'react-router-dom';
import SignInHelper from '../../../lib/sign-in-helper';
import SiteRoutes from '../../../lib/site-routes';
import MinerStatsModel from '../../../models/miner-stats/miner-stats-model';
import LocalStorageHelper from '../../../lib/local-storage-helper';
import CurrencyHelper from './../../../lib/currency-helper';
import AllWorkersModel from '../../../models/miner-stats/all-workers-model';
import UserModel from '../../../models/miner-stats/user-model';
import RecentBlockDataModel from '../../../models/recent-block-data-model';
import { getMoneroPort } from '../../../lib/coins';
import { API_STATUSES, MINER_STATUSES } from '../../../enums/statuses';
import SettingsHelper from './../../../lib/settings-helper';
import useInterval from '../../../lib/hooks/use-interval';

const MainDashboard = () => {
  let navigate = useNavigate();

  //API calls
  const [networkModel, setNetworkModel] = useState(new NetworkStatsModel())
  const [poolModel, setPoolModel] = useState(new PoolStatsModel())
  const [minerStatsModel, setMinerStatsModel] = useState(new MinerStatsModel())
  const [allWorkersModel, setAllWorkersModel] = useState(AllWorkersModel.getTestModel())
  const [userModel, setUserModel] = useState(new UserModel())  
  const [recentBlocksModel, setRecentBlocksModel] = useState(RecentBlockDataModel.makeTestArray(0))

  //Recent block data
  const [selectedRBDPort, setSelectedRBDPort] = useState(getMoneroPort().toString())

  //Statuses
  const [apiStatus, setApiStatus] = useState(API_STATUSES.pending);
  const [minerStatus, setMinerStatus] = useState(MINER_STATUSES.pending)

  //On init: produce error if user is not signed in, get stats if all is good.
  useEffect( () =>
  {
    fetchAndSetStats();
  }, [] )
  
  useEffect( () =>
  { 
    if (!SignInHelper.isSignedIn().isSignedIn)
    {
      setMinerStatus(MINER_STATUSES.unauthenticated)
    }
    else
    {

      if (allWorkersModel.miners.length === 0)
      {
        setMinerStatus(MINER_STATUSES.notMining)
      }
      else
      {
        setMinerStatus(MINER_STATUSES.minersOnline)
      }
    }
  },[allWorkersModel] )
  
  const updateDashboard = async () =>
  {
    await fetchAndSetStats();
    await fetchAndSetBlockData();
  }

  const fetchAndSetStats = async () =>
  {
    let userAddress = LocalStorageHelper.getMoneroAddress();
    let nullCounts = 0;

    //network stats
    let networkResult = await DependencyContainer.moneroOceanClient.getNetworkStats();
    if (networkResult != null)
    {
      setNetworkModel(networkResult);
    }
    else
    {
      nullCounts++
    }

    //pool stats
    let poolResult = await DependencyContainer.moneroOceanClient.getPoolStats();
    if (poolResult != null)
    {
      setPoolModel(poolResult)
    }    
    else
    {
      nullCounts++;
    }

    if (SignInHelper.isSignedIn().isSignedIn && userAddress != null)
    {
      //miner stats
      let minerResult = await DependencyContainer.moneroOceanClient.getMinerStats(userAddress)
      if (minerResult != null)
      {
        setMinerStatsModel(minerResult)
      }

      //all workers
      let allWorkersResult = await DependencyContainer.moneroOceanClient.getAllWorkers(userAddress);
      if (allWorkersResult != null)
      {
        setAllWorkersModel(allWorkersResult);
      }
      
      //user data
      let userResult = await DependencyContainer.moneroOceanClient.getUserInfo(userAddress);
      if (userResult != null)
      {
        setUserModel(userResult)
      }
    }

    if (nullCounts > 0)
    {
      setApiStatus(API_STATUSES.error)
      setMinerStatus(MINER_STATUSES.unknown)
    }
    else
    {
      setApiStatus(API_STATUSES.connectionOk)
    } 
  }

  const fetchAndSetBlockData = async () => 
  {
    let blockResult = null;
    if (selectedRBDPort === getMoneroPort().toString())
    {
      blockResult = await DependencyContainer.moneroOceanClient.getRecentMoneroBlocks();
    }
    else if (selectedRBDPort.toString() === "alt")
    {
      blockResult = await DependencyContainer.moneroOceanClient.getRecentAltBlocks();
    }
    else
    {
      blockResult = await DependencyContainer.moneroOceanClient.getRecentAltBlocksByPort(selectedRBDPort.toString());
    }

    //blocks

    if (blockResult != null)
    {
      setRecentBlocksModel(blockResult);
    }
  }

  const handleBlockChanged = (event: any) =>
  {
    setSelectedRBDPort(event.target.value);
  }

  useEffect( () =>
  {
    fetchAndSetBlockData();
  }, [selectedRBDPort])

  let interval = useInterval(
    () =>
    {
      updateDashboard()
    }, //if refresh rate is not found, set it to the default
    (LocalStorageHelper.getRefreshRate() === null ? 
      SettingsHelper.REFRESH_RATE_DEFAULT : 
      Number(LocalStorageHelper.getRefreshRate()) ) * 1000
  )


  return (

    <div className='mainDashboard'>
      <div className='statusesWrapper'>
        <DashboardStatuses apiConnectionStatus={apiStatus} minerStatus={minerStatus}/>
      </div>
      
      <div className='topStats'>
        <TopBox topText='Network Hashrate' stat={HashrateConverter.diffToParsedHashrate(18081, Number(networkModel.monero.difficulty))}/>
        <TopBox topText='Pool Hashrate' stat={HashrateConverter.parseHashrate(poolModel.getMoneroHashrate()) + " / " + HashrateConverter.parseHashrate(poolModel.totalPayHashrate)}/>
        <TopBox topText='Blocks Mined' stat={poolModel.moneroBlocksFound + "&nbsp&nbsp&nbsp/&nbsp&nbsp&nbsp"+poolModel.altBlocksFound}/>
        <TopBox topText='XMR Effort' stat={poolModel.getMoneroBlockEffort(networkModel.monero.difficulty) + "%"}/>
        <TopBox topText='Blockchain Height' stat={networkModel.monero.height}/>
      </div>

      <div className='middleSection'>
        <div className='middleLeft'>
          <div className='hashrateConnectedInfo'>
            <InfoWithChart 
                    infoHeader='Miner Hashrates'
                    topInfo='Pay Hashrate'
                    bottomInfo='Raw Hashrate'
                    topStat={HashrateConverter.parseHashrate(minerStatsModel.payHashrate)}
                    bottomStat={HashrateConverter.parseHashrate(minerStatsModel.rawHashrate)}
                    chartLink={SiteRoutes.getUserGlobalHashrateChartRoute()}
                  />
              
            <InfoWithChart
              infoHeader='Connected Miners'
              topInfo='Your Workers'
              bottomInfo='Pool Accounts'
              topStat={ SignInHelper.isSignedIn().isSignedIn ? allWorkersModel.miners.length.toString() : "-"}
              bottomStat={poolModel.connectedMiners} 
              chartLink={SiteRoutes.getConnectedMinersChartRoute()}
            />
          </div>

            { SignInHelper.isSignedIn().isSignedIn &&
            <TripleStat 
                buttons={[new ButtonLinkModel("Change Threshold", SiteRoutes.getUpdateThresholdRoute()), new ButtonLinkModel("Transaction Report", SiteRoutes.getUserTransactionReportRoute())]} 
                
                infoHeader='Balances'
                
                leftInfo='XMR Pending'
                middleInfo='XMR Paid'
                rightInfo='Payout Count'
                
                leftStat={CurrencyHelper.piconeroToMonero(Number(minerStatsModel.amountDue)) + " / " + CurrencyHelper.piconeroToMonero(Number(userModel.payout)) + ` (${CurrencyHelper.piconeroToSelectedCurrency(poolModel.price, Number(minerStatsModel.amountDue))})`}
                middleStat={CurrencyHelper.piconeroToMonero(Number(minerStatsModel.amountPaid)) + ` (${CurrencyHelper.piconeroToSelectedCurrency(poolModel.price, Number(minerStatsModel.amountPaid))})`}
                rightStat={minerStatsModel.transactionCount}
                />
            }

              <TripleStat 
                buttons={[new ButtonLinkModel("See More", SiteRoutes.getExchangeRatesRoute())]}

                infoHeader = "Exchange Rates"

                leftInfo='XMR -> USD'
                middleInfo='XMR -> EUR'
                rightInfo='XMR -> BTC'

                leftStat={"$"+poolModel.price.usd.toString()}
                middleStat={"€"+poolModel.price.eur.toString()}
                rightStat={"₿"+poolModel.price.btc.toString()}
              />
              { SignInHelper.isSignedIn().isSignedIn &&
                <MinerInfo miner={allWorkersModel}/>
              }
            </div>

        <div className='middleRight'>
          <RecentBlockData blockData={recentBlocksModel} onSelectionChanged={handleBlockChanged}/>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard