export class NestedService
{
    logNestedService(status: string)
    {
        console.log("Status coming from nested service which is used in account.service: " + status)
    }
}