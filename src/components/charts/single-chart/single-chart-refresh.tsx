import { useEffect, useState } from 'react'
import './single-chart.css'
import useInterval from '../../../lib/hooks/use-interval';
import ChartPointModel from '../../../models/charts/chart-point-model';
import SingleChart from './single-chart';

class Props
{
  pullChartData = (): Promise<ChartPointModel[] | null> =>
  {
    return Promise.resolve([])
  }

  statFormat = (a: string) : string =>
  {
    return a;
  }

  headerText: string = "";
}

const SingleChartRefresh = ( {pullChartData, headerText, statFormat}: Props ) => {

  const [chartData, setChartData] = useState<ChartPointModel[]>([])
  const [refreshDelay, setRefreshDelay] = useState<number>(4000);

  const [errorCallingApi, setErrorCallingApi] = useState<boolean>(false);

  //Chart fetching
  const fetchChartData = async () =>
  {
    let result = await pullChartData();
    if (result)
    {
      setChartData(result);
      setErrorCallingApi(false);
    }
    else
    {
      setErrorCallingApi(true);
    }
  }

  useEffect( () =>
  {
    fetchChartData();
  }, [] )

  useInterval( () =>
  {
    fetchChartData();
  }, refreshDelay )
  
  return (
    <SingleChart chartData={chartData} errorCallingApi={errorCallingApi} headerText={headerText} statFormat={statFormat}/>
  )
}

SingleChartRefresh.defaultProps = 
{
  statFormat :(a: string) : string =>
  {
    return a;
  },

  headerText: "Chart Header"
}

export default SingleChartRefresh