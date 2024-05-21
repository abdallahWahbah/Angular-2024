import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(private dataStorage: DataStorageService,
              private authService: AuthService
  ){}

  ngOnInit()
  {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  saveDataToDatabase()
  {
    this.dataStorage.storeRecipes();
  }

  fetchDataFromDatabase()
  { 
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy() 
  {
    this.userSubscription.unsubscribe();  
  }
}
