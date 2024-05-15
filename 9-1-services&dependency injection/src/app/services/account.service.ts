import { EventEmitter, Injectable } from "@angular/core";
import { NestedService } from "./nested.service";

@Injectable()
export class AccountsService
{
  constructor(private nestedService: NestedService){}

  statusUpdated = new EventEmitter<string>();

  accounts = [
      {
        name: 'Master Account',
        status: 'active'
      },
      {
        name: 'Testaccount',
        status: 'inactive'
      },
      {
        name: 'Hidden Account',
        status: 'unknown'
      }
  ];

    addAccount(name: string, status: string)
    {
      this.accounts.push({name, status})
      this.nestedService.logNestedService(status)
    }

    updateStatus(id: number, status: string)
    {
      this.accounts[id].status = status;
    }
}