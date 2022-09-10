import React from 'react'
import { Link } from 'react-router-dom';
import ButtonLinkModel from './../../../models/button-link-model';
import './triple-stat.css'

class Props
{
    buttons: ButtonLinkModel[] = [];

    infoHeader: string = "";

    leftInfo: string = "";
    middleInfo: string = "";
    rightInfo: string = "";

    leftStat: string = "";
    middleStat: string = "";
    rightStat: string = "";
}

const TripleStat = ({ buttons, infoHeader, leftInfo, middleInfo, rightInfo, leftStat, middleStat, rightStat }:Props) => {
  return (
    <div className='dashboardBoxComponent tripleStatContainer'>
        <div className='tripleStatTop'>
            <div className='statHeader'>{infoHeader}</div>
            <div className='tripleStatButtons'>
                {
                    buttons.map( (btn : ButtonLinkModel, index: number) =>
                    {
                        if (index === buttons.length-1)
                        {
                            return <Link to={btn.link} key={index} className='boxButton'>{btn.text}</Link>
                        }
                        return <Link to={btn.link} key={index} className='boxButton' style={{marginRight: "10px"}}>{btn.text}</Link>
                    } )
                }
            </div>
        </div>

        <div className='m-2'></div>

        <div className='tripleStatItems'>
            <div className='tripleStatItem'>
                <div className='statHeader'>{leftInfo}</div>
                    <div className='statItemSpacer'></div>
                <div className='statText'>{leftStat}</div>
            </div>

            <div className='statItemSpacerMobile'></div>

            <div className='tripleStatItem'>
                <div className='statHeader'>{middleInfo}</div>
                    <div className='statItemSpacer'></div>
                <div className='statText'>{middleStat}</div>
            </div>

            <div className='statItemSpacerMobile'></div>

            <div className='tripleStatItem'>
                <div className='statHeader'>{rightInfo}</div>
                    <div className='statItemSpacer'></div>
                <div className='statText'>{rightStat}</div>
            </div>
        </div>
    </div>
  )
}

export default TripleStat