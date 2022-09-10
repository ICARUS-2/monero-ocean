import { COINS } from "./coins";

export default class HashrateConverter
{
    static DEFAULT_UNIT: string = "H"
    
    static parseHashrate(hashrateStr: string, unit: string = HashrateConverter.DEFAULT_UNIT): string
    {
        let kh = 1000;
        let mh = 1000000;
        let gh = 1000000000;
        let th = 1000000000000;

        let hashrate = Number(hashrateStr);

        if (isNaN(hashrate))
            return "-"

        if (hashrate === 0)
            return ` 0${unit}/s`

        if (hashrate >= th)
        {
            let temp = hashrate / th;
            temp = Number(temp.toFixed(2));
            return temp + ` T${unit}/s`;
        }
        else if (hashrate >= gh)
        {
            let temp = hashrate / gh;
            temp = Number(temp.toFixed(2));
            return temp + ` G${unit}/s`;
        }
        else if (hashrate >= mh)
        {
            let temp = hashrate / mh;
            temp = Number(temp.toFixed(2));
            return temp + ` M${unit}/s`;
        }
        else if (hashrate >= kh)
        {
            let temp = hashrate / kh
            temp = Number(temp.toFixed(2));
            return temp + ` K${unit}/s`;
        }
        else 
        {
            hashrate = Number(hashrate.toFixed(2));
            return hashrate + ` ${unit}/s`;
        }
    }

    static difficultyToHashrate(portId: number, difficulty: number): number
    {
        //@ts-ignore
        return difficulty / COINS[portId].time * (COINS[portId].factor ? COINS[portId].factor : 1)
    }

    static diffToParsedHashrate(portId: number, difficulty: number, unit: string = HashrateConverter.DEFAULT_UNIT)
    {
        if (isNaN(difficulty))
            return "Pending"

        let hashrate = HashrateConverter.difficultyToHashrate(portId, difficulty);

        let parsedHashrate = HashrateConverter.parseHashrate(hashrate.toString(), unit)
        
        return parsedHashrate;
    }
}