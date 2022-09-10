import React, { useEffect, useState } from 'react'
import DependencyContainer from '../../lib/dependencies';
import LocalStorageHelper from '../../lib/local-storage-helper';
import './update-threshold.css'
import { useNavigate } from 'react-router-dom';
import SignInHelper from './../../lib/sign-in-helper';
import SiteRoutes from './../../lib/site-routes';
import CurrencyHelper from './../../lib/currency-helper';
import ThresholdHelper from './../../lib/threshold-helper';

const UpdateThreshold = () => {
    
    const [currentThreshold, setCurrentThreshold] = useState<number>(0);
    const [userThresholdInput, setUserThresholdInput] = useState<number>(0);
    const [formHasReceivedInput, setFormHasReceivedInput] = useState<boolean>(false);
    const [formMsg, setFormMsg] = useState<string>("");
    const [formHasError, setFormHasError] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    let navigate = useNavigate();

    const fetchUserData = async () =>
    {
        let userAddress = LocalStorageHelper.getMoneroAddress();

        if (userAddress !== null)
        {
            let result = await DependencyContainer.moneroOceanClient.getUserInfo(userAddress)

            if (!result)
            {
                setApiError("Error occurred while retrieving user data. Cannot update threshold.")
            }
            else
            {
                //@ts-ignore
                setCurrentThreshold(Number(result.payout))
            }
        }
    }

    const handleThresholdInputChanged = (event: any) =>
    {
        setFormHasReceivedInput(true)
        setUserThresholdInput(event.target.value);
    }

    const handleFormSubmit = async (event: any) =>
    {
        event.preventDefault();

        let userAddress = LocalStorageHelper.getMoneroAddress();
        if (userAddress)
        {
            let result = await DependencyContainer.moneroOceanClient.updateUserPayoutThreshold(userAddress, userThresholdInput)
            
            if (result)
            {
                alert(`Threshold successfully updated from ${CurrencyHelper.piconeroToMonero(currentThreshold)} to ${userThresholdInput} XMR. Redirecting.`)
                navigate(SiteRoutes.getDashboardRoute())
            }
            else
            {
                alert("Threshold could not be updated")
            }
        }
    }

    useEffect( () =>
    {
        if (!SignInHelper.isSignedIn().isSignedIn)
        {
            navigate(SiteRoutes.getErrorRoute())
        }
        
        fetchUserData();

    }, [] )

    useEffect( () =>
    {
        if (userThresholdInput < ThresholdHelper.MIN_THRESHOLD || userThresholdInput > ThresholdHelper.MAX_THRESHOLD)
        {
            setFormMsg(`Threshold can only be between ${ThresholdHelper.MIN_THRESHOLD} and ${ThresholdHelper.MAX_THRESHOLD}`)
            setFormHasError(true)
        }
        else
        {
            let fee = ThresholdHelper.getFeeFromThreshold(userThresholdInput)
            setFormMsg(`Fee: ${fee.fee} XMR (${fee.percentage}%)`)
            setFormHasError(false)
        }

    }, [userThresholdInput] )

    return (
        <div className='updateThresholdContainer'>

            <div className='m-1'></div>

            {apiError !== "" &&
                <div className='alert alert-danger'>
                    {apiError}
                </div>
            }

            <h1>Update Payout Threshold</h1>

            <div className='m-3'></div>
            
            {apiError === "" &&
                <div>
                    <h2>Current Threshold: {CurrencyHelper.piconeroToMonero(currentThreshold)} XMR</h2>
                
                    <div className='m-5'></div>

                    <h3>Enter new threshold</h3>
                    <form onSubmit={handleFormSubmit} className='updateThresholdForm'>
                        <div className='updateThresholdFormInputs'>
                            <input className='boxComponent newThresholdInput' step="any" type="number" name="newThreshold" onChange={handleThresholdInputChanged}></input>
                            <button className='boxButton confirmUpdateThresholdBtn' onClick={(e) =>{ handleFormSubmit(e) }}>Confirm</button>
                        </div>

                        {formHasReceivedInput &&
                            <div className={`${formHasError ? "redText" : "lightGreenText"} thresholdFormText`}>{formMsg}</div>
                        }
                    </form>
                </div>
            }
        </div>
    )
}

export default UpdateThreshold