import LocalStorageHelper from "./local-storage-helper";
import SignInResponse from '../models/sign-in-response';
import MoneroAddressChecker from "./monero-address-checker";

export default class SignInHelper
{
    static isSignedIn()
    {
        let storedAddress = LocalStorageHelper.getMoneroAddress();

        if (storedAddress === null)
        {
            return new SignInResponse(false, "No Monero address provided")
        }
        else if (!MoneroAddressChecker.validateMoneroAddress(storedAddress))
        {
            return new SignInResponse(false, "Invalid Monero address provided")
        }
        else
        {
            return new SignInResponse(true, "Signed in successfully")
        }
    }
}