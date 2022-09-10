import { getDataByPort, getMoneroPort } from "../lib/coins";
import CurrencyHelper from "../lib/currency-helper";

export default class RecentBlockDataModel 
{
    coin: string;
    height: number;
    found: string;
    reward: number;
    hash: string;

    constructor(coin: string = "COIN", height: number = -1, found: string = "1661801251056", reward: number = -1, hash: string = "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb")
    {
        this.coin = coin;
        this.height = height;
        this.found = found;
        this.reward = reward;
        this.hash = hash;
    }

    static listFromJson(json: any): RecentBlockDataModel[]
    {
        let arr: RecentBlockDataModel[] = [];

        json.forEach( (item: any) =>
            {
                let newBlock = new RecentBlockDataModel();
                let port = item.port ? item.port : getMoneroPort();

                let portData = getDataByPort(port);
                let name = portData.name;
                
                newBlock.coin = name;
                newBlock.height = item.height;
                newBlock.found = item.ts;
                newBlock.reward = Number(CurrencyHelper.applyDivisor(Number(item.value), port));
                newBlock.hash = item.hash;

                arr.push(newBlock);
            } )

        return arr;
    }

    static makeTestArray(size: number): RecentBlockDataModel[]
    {
        let arr = [];

        for(let i = 0; i < size; i++)
        {
            arr.push(new RecentBlockDataModel())
        }

        return arr;
    }
}