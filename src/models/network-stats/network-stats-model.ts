import NetworkStatsPortModel from "./network-stats-port-model";
import { getPortsArray } from "../../lib/coins";

export default class NetworkStatsModel
{
    ports: NetworkStatsPortModel[] = []
    monero: NetworkStatsPortModel = new NetworkStatsPortModel();

    static fromJson(json: any) : NetworkStatsModel
    {
        let ports = getPortsArray();
        let model = new NetworkStatsModel();

        let portModels: NetworkStatsPortModel[] = [];

        ports.forEach( port =>
            {
                let jsonPart = json[port]

                if (!jsonPart)
                    return;

                    let portModel = new NetworkStatsPortModel(Number(port), jsonPart["difficulty"], jsonPart["height"]);

                    portModels.push(portModel)
            } )

        model.ports = portModels;

        model.monero.difficulty = json.difficulty;
        model.monero.height = json.height;
        model.monero.port = 18081;

        return model;
    }

    getPortStatsByNumber(portNumber: number) : NetworkStatsPortModel | null
    {
        for(let port of this.ports)
        {
            if (port.port === portNumber)
                return port;
        }

        return null
    }
}