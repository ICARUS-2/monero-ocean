import './recent-block-data.css';
import RecentBlockDataModel from './../../../models/recent-block-data-model';
import DateTimeFormatter from '../../../lib/datetime-formatter';
import { getPortsArray, getDataByPort, getMoneroPort } from '../../../lib/coins';
import { Link } from 'react-router-dom';
import SiteRoutes from '../../../lib/site-routes';
import SignInHelper from '../../../lib/sign-in-helper';

class Props 
{
  blockData: RecentBlockDataModel[] = [];
  onSelectionChanged: any = () => {console.log("Dropdown changed default")}
}

const RecentBlockData = ({blockData, onSelectionChanged}: Props) => {

  return (
    <div className='recentBlockDataContainer dashboardBoxComponent scrollbar'>
        <div className='statHeader'>Recent Block Data</div>
        
        <div className='m-2'></div>

        <div className='recentBlockDataTop'>

        <select className='dashboardBoxComponent blockDropdown' onChange={(e)=>{onSelectionChanged(e)}} defaultValue={getMoneroPort()}>
          {
            getPortsArray().map( (port: any, index: number) =>
              {
                return (<option key={index} value={port}>{getDataByPort(port).name}</option>)
              } )
          }
          <option value="alt">Altcoins</option>
        </select>
          
        <div className='m-1'></div>
        
        { SignInHelper.isSignedIn().isSignedIn &&
          <Link to={SiteRoutes.getUserBlockPaymentsRoute()} className='boxButton bpButton'>Your block payments</Link>
        }
        </div>

        <table className='table table-borderless blockTable'>
          <thead>
            <tr>
              <th className='statText'>Coin</th>
              <th className='statText'>Height</th>
              <th className='statText'>Found</th>
              <th className='statText'>Reward</th>
              <th className='statText'>Hash</th>
            </tr>
          </thead>

          <tbody>
            {
              blockData.map( (block: RecentBlockDataModel, index: number) =>
              {
                return (
                <tr key={index}>
                  <td className='statText'>{block.coin}</td>
                  <td className='statText'>{block.height}</td>
                  <td className='statText'>{DateTimeFormatter.UnixTSToDate(block.found)}</td>
                  <td className='statText'>{block.reward}</td>
                  <td className='statText'>{block.hash}</td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default RecentBlockData