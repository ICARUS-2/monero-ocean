export default class MoneroAddressChecker
{
    static MONERO_ADDR_LENGTH: number = 95;
    static MONERO_INTEGR_ADDR_LENGTH: number = 106;

    static validateMoneroAddress(moneroAddress: string): boolean
    {
        if (moneroAddress.length !== MoneroAddressChecker.MONERO_ADDR_LENGTH && moneroAddress.length !== MoneroAddressChecker.MONERO_INTEGR_ADDR_LENGTH)
        {
            return false;
        }

        if (!moneroAddress.startsWith('4') && !moneroAddress.startsWith('8'))
        {
            return false;
        }

        return true;
    }
}