import ChartPointModel from "../../models/charts/chart-point-model";
import AllWorkersModel from "../../models/miner-stats/all-workers-model";
import MinerStatsModel from "../../models/miner-stats/miner-stats-model";
import UserModel from "../../models/miner-stats/user-model";
import NetworkStatsModel from "../../models/network-stats/network-stats-model";
import networkStatsModel from "../../models/network-stats/network-stats-model";
import PoolStatsModel from "../../models/pool-stats/pool-stats-model";
import poolStatsModel from "../../models/pool-stats/pool-stats-model";
import RecentBlockDataModel from "../../models/recent-block-data-model";
import TransactionDataModel from "../../models/transactions/transaction-data-model";
import UserBlockPaymentRecord from "../../models/user-block-payments/user-block-payment-record";
import ApiRoutes from "../url-helper";
import IMoneroOceanClient from "./i-monero-ocean-client";
import TestMoneroOceanClient from "./test-monero-ocean-client";

export default class MoneroOceanClient implements IMoneroOceanClient
{
    async getNetworkStats(): Promise<networkStatsModel | null> 
    {
        let result: Response = await fetch(ApiRoutes.getNetworkStatsRoute());
        
        if (result.ok)
        {
            let json = await result.json();
            return NetworkStatsModel.fromJson(json);
        }

        return null;
    }

    async getPoolStats(): Promise<poolStatsModel | null> 
    {
        let result: Response = await fetch(ApiRoutes.getPoolStatsRoute());

        if (result.ok)
        {
            let json = await result.json();
            return PoolStatsModel.fromJson(json);
        }

        return null;
    }

    async getMinerStats(address: string): Promise<MinerStatsModel | null> 
    {
        let result = await fetch(ApiRoutes.getMinerStatsRoute(address));

        if (result.ok)
        {
            let json = await result.json()
            return MinerStatsModel.fromJson(json)
        }

        return null;
    }

    async getAllWorkers(address: string): Promise<AllWorkersModel | null> 
    {
        let result = await fetch(ApiRoutes.getAllWorkersRoute(address));
        
        if (result.ok)
        {
            let json = await result.json();
            return AllWorkersModel.fromJson(json);
        }
        
        return null;
    }

    async getUserInfo(address: string): Promise<UserModel | null> 
    {
        let result = await fetch(ApiRoutes.getUserRoute(address))

        if (result.ok)
        {
            let json = await result.json();
            return UserModel.fromJson(json);
        }

        return null;
    }

    async getRecentMoneroBlocks(): Promise<RecentBlockDataModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getMoneroBlocksRoute());

        if (result.ok)
        {
            let json = await result.json();
            return RecentBlockDataModel.listFromJson(json);
        }

        return null;
    }

    async getRecentAltBlocks(): Promise<RecentBlockDataModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getAltBlocksRoute());

        if (result.ok)
        {
            let json = await result.json();
            return RecentBlockDataModel.listFromJson(json);
        }

        return null;
    }

    async getRecentAltBlocksByPort(port: string): Promise<RecentBlockDataModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getAltBlocksByPortRoute(port));

        if (result.ok)
        {
            let json = await result.json();
            return RecentBlockDataModel.listFromJson(json);
        }

        return null;
    }

    async getTransactionsForUser(address: string): Promise<TransactionDataModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getTransactionReportRoute(address))

        if (result.ok)
        {
            let json = await result.json();
            return TransactionDataModel.listFromJson(json);
        }

        return null;
    }

    async getUserBlockPayments(address: string, pageNumber: number, count: number): Promise<UserBlockPaymentRecord[] | null> 
    {
        let result = await fetch(ApiRoutes.getUserBlockPaymentsRoute(address, pageNumber, count));

        if (result.ok)
        {
            let json = await result.json();
            return UserBlockPaymentRecord.listFromJson(json);
        }

        return null;
    }

    async updateUserPayoutThreshold(address: string, amount: number): Promise<boolean> 
    {
        let result = await fetch(ApiRoutes.getUpdateThresholdRoute(), {
            "headers": {
              "content-type": "application/json",
            },
            "body": `{\"username\":\"${address}\",\"threshold\":${amount}}`,
            "method": "POST",
          });

        return result.ok;
    }

    async getConnectedMinersChart(): Promise<ChartPointModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getConnectedMinersChartRoute());

        if (result.ok)
        {
            let json = await result.json();
            return ChartPointModel.listFromJson(json, "ts", "cn");
        }

        return null;
    }

    async getUserGlobalHashrateChart(address: string): Promise<ChartPointModel[] | null> 
    {
        let result = await fetch(ApiRoutes.getUserGlobalHashrateChartRoute(address));

        if (result.ok)
        {
            let json = await result.json();
            return ChartPointModel.listFromJson(json, "ts", "hs2")
        }

        return null;
    }   
}