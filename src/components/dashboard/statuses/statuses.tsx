import React from 'react'
import { API_STATUSES, MINER_STATUSES } from '../../../enums/statuses';
import FlashingLight from '../../shared/flashing-light/flashing-light';
import './statuses.css';

class Props 
{
    apiConnectionStatus: string = "";
    minerStatus: string = ""
}

const DashboardStatuses = ( {apiConnectionStatus, minerStatus} : Props ) => {

  const getMinerStatus = () =>
  {
    switch(minerStatus)
    {
      case MINER_STATUSES.minersOnline: 
        return "Miners Online"

      case MINER_STATUSES.notMining:
        return "Not Mining"

      case MINER_STATUSES.pending:
        return "Pending"

      case MINER_STATUSES.unknown:
        return "Unknown"

      case MINER_STATUSES.unauthenticated:
        return "Unauthenticated"

      default:
        return "Error"
    }
  }

  const getApiStatus = () =>
  {
    switch(apiConnectionStatus)
    {
      case API_STATUSES.connectionOk:
        return "Connection OK"

      case API_STATUSES.pending:
        return "Pending"

      case API_STATUSES.error:
        return "Connection Error"
    }
  }

  return (
    <div className='dashboardStatuses'>
        <div className='dashboardStatusItem'>API: <span className=
        { 
          ` 
            ${(apiConnectionStatus === API_STATUSES.connectionOk || apiConnectionStatus === API_STATUSES.pending) ? "statText" : ""} 
            ${apiConnectionStatus === API_STATUSES.error ? "redText" : ""}
          ` 
        }>{getApiStatus()}</span> <FlashingLight delay={1} display={ apiConnectionStatus === API_STATUSES.connectionOk }/> </div>

        <div className='spacingDiv'></div>

        <div className='dashboardStatusItem'>Status: <span className=
        {
          `
            ${minerStatus === MINER_STATUSES.minersOnline || minerStatus === MINER_STATUSES.pending ? "statText" : ""}
            ${minerStatus === MINER_STATUSES.notMining || minerStatus === MINER_STATUSES.unauthenticated ? "yellowText" : ""}
            ${minerStatus === MINER_STATUSES.unknown ? "redText" : ""}
          `
        }>{getMinerStatus()}</span> <FlashingLight delay={1} display={ minerStatus === MINER_STATUSES.minersOnline }/> </div>
    </div>
  )
}
export default DashboardStatuses