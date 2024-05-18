import { Pipe, PipeTransform } from "@angular/core";

// don't forget to add this pipe to the declaration array in app.module.ts
@Pipe({
    name: "shorten"
})
export class ShortenPipe implements PipeTransform
{
    transform(value: any, limit: number)
    {
        if(value.length <= limit) return value;
        else return value.substring(0, limit) + "...";   
    }
}