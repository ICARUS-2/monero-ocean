import useInterval from "../../../lib/hooks/use-interval"
import { useState, useEffect } from 'react';
import DependencyContainer from "../../../lib/dependencies";
import SignInHelper from './../../../lib/sign-in-helper';
import { useNavigate } from 'react-router-dom';
import SiteRoutes from './../../../lib/site-routes';
import LocalStorageHelper from "../../../lib/local-storage-helper";
import AllWorkersChartModel from "../../../models/charts/all-workers-chart-model";

const AllWorkersChart = () => {

    const [delay, setDelay] = useState<number>(60000);
    const [chartData, setChartData] = useState<AllWorkersChartModel[]>([])
    const navigate = useNavigate();

    const fetchStats = async () =>
    {
        if (SignInHelper.isSignedIn().isSignedIn)
        {
            let address = LocalStorageHelper.getMoneroAddress();
            if (address != null)
            {
                let result = await DependencyContainer.moneroOceanClient.getAllWorkersChart(address)
                
                
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
        <div>AllWorkersChart</div>
    )
}

export default AllWorkersChart