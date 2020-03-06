import { Component, OnInit, NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { City } from './city'
import { CityName } from './cityName'
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  cities: City[];

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

  addCity(cityName: string): void {
    cityName = cityName.trim();

    const newCity = new CityName(cityName);
    this.spinnerService.show();
    this.homeService.addCity(newCity).subscribe(() => {
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
