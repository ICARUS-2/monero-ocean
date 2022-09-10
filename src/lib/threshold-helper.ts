export default class ThresholdHelper
{
    static TX_FEES: number[] = [0.0004, 0.0003, 0.0002, 0.0001]
    static THRESHOLDS: number[] = [0.5026, 1.5018, 2.5011, 3.5003]
    static MIN_THRESHOLD: number = 0.0030;
    static MAX_THRESHOLD: number = 1000;

    static getFeeFromThreshold(threshold: number)
    {
        if (threshold > ThresholdHelper.THRESHOLDS[ThresholdHelper.THRESHOLDS.length - 1])
            return {fee : 0, percentage : 0}

        for (let i = 0; i < ThresholdHelper.THRESHOLDS.length; i++)
        {
            if (threshold > ThresholdHelper.THRESHOLDS[i])
                continue;
            else
            {
                return {fee : ThresholdHelper.TX_FEES[i], percentage : ThresholdHelper.TX_FEES[i] / threshold * 100}
            }
        }

        return {fee : 0, percentage : 0}
    }
}