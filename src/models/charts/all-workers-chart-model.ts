import ChartPointModel from "./chart-point-model";

export default class AllWorkersChartModel
{
    workerId: string = "";
    chartEntries: ChartPointModel[] = [];

    constructor(workerId: string = "", chartEntries: ChartPointModel[] = [])
    {
        this.workerId = workerId;
        this.chartEntries = chartEntries;
    }

    static listFromJson(json: any): AllWorkersChartModel[]
    {
        let arr: AllWorkersChartModel[] = []

        let keys = Object.keys(json).map(k=>k)
        
        arr = keys.map( key =>
            {
                let rawData = json[key];

                let parsedData = ChartPointModel.listFromJson(rawData, "ts", "hs2");

                return new AllWorkersChartModel(key, parsedData);
            } )

        return arr;
    }
}