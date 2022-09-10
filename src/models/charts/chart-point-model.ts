export default class ChartPointModel
{
    x: number
    y: number

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    static listFromJson(json: any, xKey: string, yKey: string): ChartPointModel[]
    {
        let arr: ChartPointModel[] = [];

        arr = json.map( (item: any)=>
            {
                let x = item[xKey];
                let y = item[yKey];

                return new ChartPointModel(x, y);
            } )

        return arr;
    }
}