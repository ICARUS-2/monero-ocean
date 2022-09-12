import useInterval from "../../../lib/hooks/use-interval"
import { useState, useEffect } from 'react';
import DependencyContainer from "../../../lib/dependencies";
import SignInHelper from './../../../lib/sign-in-helper';
import { useNavigate } from 'react-router-dom';
import SiteRoutes from './../../../lib/site-routes';
import LocalStorageHelper from "../../../lib/local-storage-helper";
import AllWorkersChartModel from "../../../models/charts/all-workers-chart-model";
import SingleChart from "../single-chart/single-chart";
import HashrateConverter from './../../../lib/hashrate-converter';

const AllWorkersChart = () => {

    const [delay, setDelay] = useState<number>(60000);
    const [chartData, setChartData] = useState<AllWorkersChartModel[]>([]);
    const [errorCallingApi, setErrorCallingApi] = useState<boolean>(false);

    const navigate = useNavigate();

    const fetchStats = async () =>
    {
        if (SignInHelper.isSignedIn().isSignedIn)
        {
            let address = LocalStorageHelper.getMoneroAddress();
            if (address != null)
            {
                let result = await DependencyContainer.moneroOceanClient.getAllWorkersChart(address)
                
                if (result != null)
                {
                    setChartData(result);
                }

                setErrorCallingApi(result == null)
            }
        }
        else
        {
            navigate(SiteRoutes.getErrorRoute())
        }
    }

    useEffect( () =>
    {
        fetchStats();
    }, [] )
    
    useInterval( async () =>
    {
        fetchStats();
    }, delay );

    return (
        <div>
            {
                chartData.map( ( data, index ) =>
                {
                    return <SingleChart key={index}
                        chartData={data.chartEntries} 
                        errorCallingApi={errorCallingApi} 
                        headerText={data.workerId} 
                        statFormat={HashrateConverter.parseHashrate}
                        height={170}/>
                } )
            }
        </div>
    )
}

export default AllWorkersChart