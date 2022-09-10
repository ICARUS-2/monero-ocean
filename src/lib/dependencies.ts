import IMoneroOceanClient from "./monero-ocean-client/i-monero-ocean-client";
import MoneroOceanClient from "./monero-ocean-client/monero-ocean-client";
import TestMoneroOceanClient from "./monero-ocean-client/test-monero-ocean-client";

export default class DependencyContainer
{
    static moneroOceanClient: IMoneroOceanClient = new MoneroOceanClient();
}