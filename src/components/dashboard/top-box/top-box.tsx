import React from 'react'
import './top-box.css'

class Props 
{
    topText: string = "Stat type";
    stat: string = "Stat here"
}

const TopBox = ( {topText, stat} : Props ) => {
  return (
    <div className='topBoxContainer dashboardBoxComponent'>
        <span className='statHeader'>{topText}</span>
        <div className='spaceBetweenLines'></div>
        <span className='statText' dangerouslySetInnerHTML={{ __html: stat }}></span>
    </div>
  )
}

TopBox.defaultProps =
{
  topText: "Top text",
  stat: "Pending"
}

export default TopBox