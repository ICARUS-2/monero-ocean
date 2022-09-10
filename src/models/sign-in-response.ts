export default class SignInResponse
{
    isSignedIn: boolean;
    message: string;

    constructor(isSignedIn: boolean = false, message: string = "")
    {
        this.isSignedIn = isSignedIn;
        this.message = message;
    }
}