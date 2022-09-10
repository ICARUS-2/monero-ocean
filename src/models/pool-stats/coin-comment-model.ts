export default class CoinCommentModel
{
    port: string;
    comment: string;

    constructor(port: string = "Pending", comment: string = "Pending")
    {
        this.port = port;
        this.comment = comment;
    }
}