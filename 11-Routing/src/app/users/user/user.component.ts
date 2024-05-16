import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    }

    // the above way will not reload the page if we changed the params (default behavior) (only render one time)
    // so we need to inform angular that the params has changed and listen to changes (using observables) 
    this.paramsSubscription = this.route.params.subscribe((params: Params) =>{
      this.user.id = params["id"];
      this.user.name = params["name"]
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  // (optional) if the component is destroyed, the subscription will stay, so we need to unsubscribe

}
