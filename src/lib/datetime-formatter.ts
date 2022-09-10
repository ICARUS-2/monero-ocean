export default class DateTimeFormatter
{
    static UnixTSToDate(unix_timestamp: string)
    {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //@ts-ignore
        let date = new Date(Number(unix_timestamp)).toLocaleTimeString("en-us", options)
        return date;
    }

    static UnixTSToDateLong(ts: number)
    {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let d = new Date(0);
        d.setUTCSeconds(ts);
        //@ts-ignore
        return d.toLocaleTimeString("en-us",options)
    }

    static UnixTSToDateShort(ts: number)
    {
        let d = new Date(0);
        d.setUTCSeconds(ts);
        //@ts-ignore
        return d.toLocaleTimeString("en-us")
    }
}