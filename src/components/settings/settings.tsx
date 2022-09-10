import React, {useState} from 'react'
import "./settings.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'
import LocalStorageHelper from '../../lib/local-storage-helper';
import SettingsHelper from './../../lib/settings-helper';

const Settings = () => {
    const [refreshRateValue, setRefreshRateValue] = useState(LocalStorageHelper.getRefreshRate())
    const [currencySelectValue, setCurrencySelectValue] = useState(LocalStorageHelper.getCurrencyChoice())
        
    const handleRefreshRateChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        LocalStorageHelper.setRefreshRate(Number(e.currentTarget.value))
        setRefreshRateValue(e.currentTarget.value)
    }

    const handleCurrencyChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        LocalStorageHelper.setCurrencyChoice(e.target.value);
        setCurrencySelectValue(e.target.value);
    }

    return (
        <div className='settingsContainer'>
            <h1>Settings</h1>

            <div className='settingsSpacingDiv'></div>

            <div>
                <h3>Refresh Rate</h3>
                <ButtonGroup>
                    {
                        SettingsHelper.REFRESH_RATE_OPTIONS.map( (opt, index) =>
                            {
                                return (
                                    <ToggleButton 
                                        key={index}
                                        id={`refreshRate`+index}
                                        type="radio"
                                        variant="primary"
                                        value={opt}
                                        name="refreshRate"
                                        checked={refreshRateValue === opt.toString()}
                                        onChange={ e => handleRefreshRateChanged(e) }>
                                        {opt}s
                                    </ToggleButton>
                                )
                            } )
                    }
                </ButtonGroup>
            </div>

            <div className='settingsSpacingDiv'></div>
            
            <div>
                <h3>Currency</h3>
                <ButtonGroup>
                    {
                        SettingsHelper.CURRENCY_OPTIONS.map( (opt, index) =>
                        {
                            return (
                                <ToggleButton
                                    key={index}
                                    id={`currencySelect`+index}
                                    type="radio"
                                    variant="primary"
                                    value={opt}
                                    name="currencySelect"
                                    checked={currencySelectValue === opt}
                                    onChange={ e => handleCurrencyChanged(e) }>
                                    {opt.toUpperCase()}
                                </ToggleButton>
                            )
                        } )
                    }
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Settings