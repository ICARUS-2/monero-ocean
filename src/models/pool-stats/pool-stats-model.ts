import { getMoneroPort } from "../../lib/coins";
import BlocksFoundModel from "./blocks-found-model";
import CoinCommentModel from "./coin-comment-model";
import PortAlgorithm from "./port-algorithm";
import PortEffortModel from "./port-effort-model";
import PortHashrateModel from "./port-hashrate-model";
import PriceModel from "./price-model";
import NetworkStatsModel from './../network-stats/network-stats-model';
import PortMinerCountModel from './port-miner-count-model';

export default class PoolStatsModel
{
    totalPayHashrate: string = "Pending"
    connectedMiners: string = "Pending";
    roundHashes: string = "Pending"
    moneroBlocksFound: string = "Pending"
    altBlocksFound: string = "Pending";
    totalPaymentsMade: string = "Pending";

    price: PriceModel = new PriceModel();

    blocksPerChainFound: BlocksFoundModel[] = [];
    coinComments: CoinCommentModel[] = [];
    currentEfforts: PortEffortModel[] = [];
    portHashrates: PortHashrateModel[] = [];
    portCoinAlgorithms: PortAlgorithm[] = [];
    portMinerCounts: PortMinerCountModel[] = [];
    
    static fromJson(json: any): PoolStatsModel
    {
        let poolStatsJson = json.pool_statistics;

        let model = new PoolStatsModel();

        model.totalPayHashrate = poolStatsJson.hashRate.toString();
        model.connectedMiners = poolStatsJson.miners;
        model.roundHashes = poolStatsJson.roundHashes;
        model.moneroBlocksFound = poolStatsJson.totalBlocksFound;
        model.altBlocksFound = poolStatsJson.totalAltBlocksFound;
        model.totalPaymentsMade = poolStatsJson.totalPayments;

        model.price = new PriceModel(
            poolStatsJson.price.usd.toFixed(2),
            poolStatsJson.price.eur.toFixed(2),
            poolStatsJson.price.btc.toFixed(8)
        )

        let blocksPerChainKeys = Object.keys(poolStatsJson.altBlocksFound).map( i => i );

        model.blocksPerChainFound = blocksPerChainKeys.map( portNumber =>
            {
                let found = poolStatsJson.altBlocksFound[portNumber];
                return new BlocksFoundModel(portNumber, found)
            } )

        
        let coinCommentKeys = Object.keys(poolStatsJson.coinComment).map( a => a );

        model.coinComments = coinCommentKeys.map( portNumber =>
            {
                let comment = poolStatsJson.coinComment[portNumber];
                return new CoinCommentModel(portNumber, comment);
            })

        
        let effortKeys = Object.keys(poolStatsJson.currentEfforts).map(a => a);

        model.currentEfforts = effortKeys.map( portNumber =>
            {
                let effort = poolStatsJson.currentEfforts[portNumber];
                return new PortEffortModel(portNumber, effort);
            })

        
        let portHashrateKeys = Object.keys(poolStatsJson.portHash).map(a => a)

        model.portHashrates = portHashrateKeys.map( portNumber =>
            {
                let portHr = poolStatsJson.portHash[portNumber];
                return new PortHashrateModel(portNumber, portHr)
            } )



        let portAlgos = Object.keys(poolStatsJson.portCoinAlgo).map(a => a);
        
        model.portCoinAlgorithms = portAlgos.map( portNumber =>
            {
                let algo = poolStatsJson.portCoinAlgo[portNumber];
                return new PortAlgorithm(portNumber, algo);
            } )

        
        let portMiners = Object.keys(poolStatsJson.portMinerCount).map(a => a)

        model.portMinerCounts = portMiners.map( portNumber =>
            {
                let count = poolStatsJson.portMinerCount[portNumber];
                return new PortMinerCountModel(portNumber, count);
            } )

        return model;
    }

    getMoneroHashrate()
    {
        if (this.portHashrates.length > 0)
        {
            let hr = "NOT FOUND"
            this.portHashrates.forEach( h =>
                {
                    //@ts-ignore
                    if (h.port.toString() === getMoneroPort().toString())
                    {
                        hr = h.hashrate;
                    }
                } )
            
            return hr;
        }

        return "INVALID"
    }

    getMoneroBlockEffort(moneroDifficulty: string) : string
    {
        let res = 100 * Number(this.roundHashes) / Number(moneroDifficulty)
        res = Number(res.toFixed(2));

        if (isNaN(res))
            return "Pending"

        return res.toString();
    }

    getAlgoByPort(port: string) : PortAlgorithm | null
    {
        for(let p of this.portCoinAlgorithms)
        {
            if (p.port === port)
            {
                return p;
            }
        }

        return null;
    }

    getEffortByPort(port: string) : PortEffortModel | null
    {
        for(let p of this.currentEfforts)
        {
            if (p.port === port)
            {
                return p;
            }
        }

        return null;
    }
    
    getEffortPercentage(port: string, networkStats: NetworkStatsModel) : string
    {
        return ((Number(this.getEffortByPort(port)?.effort) / Number(networkStats.getPortStatsByNumber(Number(port))?.difficulty))*100).toFixed(2)
    }

    getPoolBlocksByPort(port: string) : BlocksFoundModel | null
    {
        for(let p of this.blocksPerChainFound)
        {
            if(p.port === port)
            {
                return p
            }
        }
        return null;
    }

    getMinerCountByPort(port: string): PortMinerCountModel
    {
        for (let p of this.portMinerCounts)
        {
            if (p.port === port)
            {
                return p
            }
        }
        return new PortMinerCountModel(port, 0);
    }

    getHashrateByPort(port: string) : PortHashrateModel | null
    {
        for(let p of this.portHashrates)
        {
            if (p.port === port)
            {
                return p
            }
        }
        return null;
    }

    getCommentByPort(port: string) : string
    {
        for(let p of this.coinComments)
        {
            if (p.port === port)
            {
                return p.comment;
            }
        }
        return "";
    }
}