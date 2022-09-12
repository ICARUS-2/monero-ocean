import ChartPointModel from "../../models/charts/chart-point-model";
import AllWorkersModel from "../../models/miner-stats/all-workers-model";
import MinerStatsModel from "../../models/miner-stats/miner-stats-model";
import UserModel from "../../models/miner-stats/user-model";
import NetworkStatsModel from "../../models/network-stats/network-stats-model";
import PoolStatsModel from "../../models/pool-stats/pool-stats-model";
import RecentBlockDataModel from "../../models/recent-block-data-model";
import TransactionDataModel from "../../models/transactions/transaction-data-model";
import UserBlockPaymentRecord from './../../models/user-block-payments/user-block-payment-record';
import AllWorkersChartModel from './../../models/charts/all-workers-chart-model';

export default interface IMoneroOceanClient
{
    getNetworkStats(): Promise<NetworkStatsModel | null>

    getPoolStats(): Promise<PoolStatsModel | null>

    getMinerStats(address: string): Promise<MinerStatsModel | null>

    getAllWorkers(address: string): Promise<AllWorkersModel | null>

    getUserInfo(address: string): Promise<UserModel | null>

    getRecentMoneroBlocks(): Promise<RecentBlockDataModel[] | null>
    
    getRecentAltBlocks(): Promise<RecentBlockDataModel[] | null>

    getRecentAltBlocksByPort(port: string): Promise<RecentBlockDataModel[] | null>

    getTransactionsForUser(address: string): Promise<TransactionDataModel[] | null>

    getUserBlockPayments(address: string, pageNumber: number, count: number): Promise<UserBlockPaymentRecord[] | null>

    updateUserPayoutThreshold(address: string, amount: number ) : Promise<boolean>

    //charts
    getConnectedMinersChart(): Promise<ChartPointModel[] | null>;

    getUserGlobalHashrateChart(address: string): Promise<ChartPointModel[] | null>;

    getAllWorkersChart(address: string): Promise<AllWorkersChartModel[] | null>
}