import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ICity } from '../shared/interfaces/city'
import { NgxSpinnerService } from "ngx-spinner";
import { ICityAdd } from '../shared/interfaces/city-add';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  cities: ICity[];

  constructor(private homeService: HomeService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.spinnerService.show();
    this.homeService.getCities().subscribe(cities => {
      this.cities = cities
      this.spinnerService.hide();
    });
  }

  addCity(city: ICityAdd): void {
    this.spinnerService.show();
    this.homeService.addCity(city).subscribe(() => {
      this.getCities()
      this.spinnerService.hide();
    });
  }

  update(): void {
    this.spinnerService.show();
    this.homeService.refresh().subscribe(() => {
      this.getCities();
      this.spinnerService.hide();
    });
  }
}
