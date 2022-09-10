import IndividualMinerModel from './individual-miner-model';

export default class AllWorkersModel
{
    totalSharesAccepted: number;
    totalSharesRejected: number;
    
    miners: IndividualMinerModel[]

    constructor(tsa: number = -1, tsr: number = -1, miners: IndividualMinerModel[] = [])
    {
        this.totalSharesAccepted = tsa;
        this.totalSharesRejected = tsr;
        this.miners = miners;
    }

    static fromJson(json: any): AllWorkersModel
    {
        let model = new AllWorkersModel();
        let entries = Object.keys(json).map( a=> a )

        entries.forEach( e =>
            {
                let chunk = json[e]

                //mind the typo!
                if (chunk.identifer === "global")
                {
                    model.totalSharesAccepted = chunk.validShares;
                    model.totalSharesRejected = chunk.invalidShares;
                }
                else
                {
                    model.miners.push(new IndividualMinerModel(
                        chunk.identifer, 
                        chunk.hash2, 
                        chunk.hash, 
                        chunk.validShares, 
                        chunk.invalidShares
                        ))
                }
            } )

        return model;
    }

    static getTestModel() : AllWorkersModel
    {
        let miners: IndividualMinerModel[] = []
        for(let i = 0; i < 1; i++)
        {
            miners.push(new IndividualMinerModel())
        }

        return new AllWorkersModel(-1, -1 , miners);
    }
}