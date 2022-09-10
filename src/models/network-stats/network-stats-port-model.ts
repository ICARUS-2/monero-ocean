export default class NetworkStatsPortModel
{
    port: number;
    difficulty: string;
    height: string;

    constructor(port: number = -1, difficulty: string = "Pending", height: string = "Pending")
    {
        this.port = port;
        this.difficulty = difficulty;
        this.height = height;
    }
}