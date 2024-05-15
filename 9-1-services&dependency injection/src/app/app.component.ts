import { Component, OnInit } from '@angular/core';
import { AccountsService } from './services/account.service';
import { NestedService } from './services/nested.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService, NestedService]
})
export class AppComponent implements OnInit{

  accounts: {name: string, status: string}[]
  constructor(private accountsService: AccountsService){
    // this.accounts = this.accountsService.accounts; // initialization should be done in ngOnInit, but this will work also
  }
  
  ngOnInit()
  {
    this.accounts = this.accountsService.accounts;
  }
}
