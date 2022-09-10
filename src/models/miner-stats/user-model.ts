export default class UserModel
{
    payout: string = "Pending";
    emailEnabled: string = "Pending"

    static fromJson(json: any) : UserModel
    {
        let model = new UserModel();

        model.payout = json.payout_threshold;
        model.emailEnabled = json.email_enabled;

        return model;
    }
}