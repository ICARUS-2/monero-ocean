import React, {useEffect, useState} from 'react'
import './flashing-light.css'

class Props
{
    delay: number = 1;
    display: boolean = true;
}

const FlashingLight = ({delay, display}:Props) => 
{
    const [displayFlasher, setDisplayFlasher] = useState(true)
    //const [flashIntervalFunction, setFlashIntervalFunction] = useState()

    useEffect( ()=>
    {
        let interval = setInterval( () =>
        {
            setDisplayFlasher( (df) => !df)
        }, delay * 1000 )
        
        return () =>
        {
            clearInterval(interval)
        }

    }, [] ) 

    return (
        <span className={`${display ? "d-inline" : "d-none"}`}>
            <span dangerouslySetInnerHTML={ {__html: displayFlasher ? "🟢" : ""}} className="flashingLight">
                
            </span>
        </span>
    )
}

FlashingLight.defaultProps =
{
    delay: 1,
    display: true
}

export default FlashingLight