
import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import DateTimeFormatter from '../../../lib/datetime-formatter';
import ChartPointModel from '../../../models/charts/chart-point-model'

class Props
{
    chartData: ChartPointModel[] = [];
    errorCallingApi: boolean = false;
    headerText: string = "";
    height: number = 300;
    statFormat = (a: string) : string =>
    {
      return a;
    }
}

const SingleChart = ({chartData, errorCallingApi, headerText, statFormat, height} : Props) => {
    
    const [currentCount, setCurrentCount] = useState<number>(0)
    const [dayChange, setDayChange] = useState<number>(0);
    const [average, setAverage] = useState<number>(0);
    const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth);

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
    const handleWindowSizeChange = () => 
    {
        setBrowserWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <div className='singleChartContainer'>
        {errorCallingApi &&
          <div className='alert alert-danger'>Error retrieving data</div>
        }
        <h2>{headerText} {statFormat(currentCount.toString())} <span className={`${dayChange >= 0 ? "limeText" : "redText"}`}>({dayChange >= 0 ? "↑+" : "↓"}{dayChange}%)</span></h2>
        <h3>Avg {statFormat(average.toString())}</h3>

        <LineChart className='singleChart'
        width={browserWidth * 0.9}
        height={height}
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

export default SingleChart