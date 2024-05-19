import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService){}

  saveDataToDatabase()
  {
    this.dataStorage.storeRecipes();
  }

  fetchDataFromDatabase()
  { 
    this.dataStorage.fetchRecipes().subscribe();
  }
}
