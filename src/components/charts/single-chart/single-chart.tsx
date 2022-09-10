import React, { useEffect, useState } from 'react'
import DependencyContainer from '../../../lib/dependencies'
import './single-chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DateTimeFormatter from '../../../lib/datetime-formatter';
import useInterval from '../../../lib/hooks/use-interval';
import ChartPointModel from './../../../models/charts/chart-point-model';

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

const SingleChart = ( {pullChartData, headerText, statFormat}: Props ) => {

  const [chartData, setChartData] = useState<ChartPointModel[]>([])
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [dayChange, setDayChange] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth);
  const [refreshDelay, setRefreshDelay] = useState<number>(60000);

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

  useEffect( () =>
  {
    if(chartData.length)
    {
      setCurrentCount(chartData[chartData.length-1].y)

      let firstEntry = chartData[0].y;
      let lastEntry = chartData[chartData.length-1].y

      //set change from start to finish
      let diff = ((lastEntry / firstEntry * 100)-100).toFixed(2)
      setDayChange(Number(diff))

      //set the average
      let accumulator: number = 0;
      chartData.forEach( (d: ChartPointModel)=>
      {
        accumulator += d.y;
      } )
      let avg = accumulator / chartData.length;
      setAverage(avg);
    }
  }, [chartData] )


  //Window resizing
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setBrowserWidth(window.innerWidth);
  };

  
  return (
    <div className='singleChartContainer'>
        {errorCallingApi &&
          <div className='alert alert-danger'>Error retrieving data</div>
        }
        <h2>{headerText} {statFormat(currentCount.toString())} <span className={`${dayChange >= 0 ? "limeText" : "redText"}`}>({dayChange >= 0 ? "↑+" : "↓"}{dayChange}%)</span></h2>
        <h3>Avg {statFormat(average.toString())}</h3>

        <LineChart className='singleChart'
        width={browserWidth * 0.9}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis minTickGap={40} dataKey={"x"} tickFormatter={ (x: number) => DateTimeFormatter.UnixTSToDateShort(x) }/>
        <YAxis domain={['auto', 'auto']}/>
        {/*@ts-ignore*/}
        <Line type="monotone" dot={false} dataKey="y" stroke={"cyan"}/>
      </LineChart>
    </div>
  )
}

SingleChart.defaultProps = 
{
  statFormat :(a: string) : string =>
  {
    return a;
  },

  headerText: "Chart Header"
}

export default SingleChart