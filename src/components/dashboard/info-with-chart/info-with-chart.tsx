import React from 'react'
import { Link } from 'react-router-dom';
import './info-with-chart.css';

class Props 
{
    infoHeader: string = "";
    topInfo: string = "";
    bottomInfo: string = "";
    
    topStat: string = "";
    bottomStat: string = "";

    chartLink: string = "/";
}

const InfoWithChart = ( {infoHeader, topInfo, bottomInfo, topStat, bottomStat, chartLink}:Props ) => {
  return (
    <div className='dashboardBoxComponent infoContainer'>
        <div className='infoTop'>
            <div className='statHeader'>{infoHeader}</div>
            <Link to={chartLink} className='boxButton chartButton'>Chart</Link>
        </div>

        <div className='spacingDiv'></div>

        <div className='infoDisplay'>
            <div>{topInfo}</div>
            <div className='statText'>{topStat}</div>
        </div>

        <div className='infoDisplay'>
            <div>{bottomInfo}</div>
            <div className='statText'>{bottomStat}</div>
        </div>
    </div>
  )
}

export default InfoWithChart