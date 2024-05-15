import { Component } from '@angular/core';
import { LoggingService } from '../services/logging.service';
import { AccountsService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService
  ){
    this.accountsService.statusUpdated.subscribe((status) =>
    {
      console.log("Status from new account account, event emmiter in the service: " + status)
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChanged(accountStatus)
  }
}
