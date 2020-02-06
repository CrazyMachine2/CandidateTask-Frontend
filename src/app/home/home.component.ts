import { Component, OnInit, NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { City } from './city'
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ]
})

export class HomeComponent implements OnInit {
  cities: City[];

  constructor(private homeService: HomeService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.spinnerService.show();
    this.homeService.getCities().subscribe(data => {
      this.cities = data
      this.spinnerService.hide();
    });
  }

  addCity(cityName: string): void {
    cityName = cityName.trim();

    const newCity = new City(cityName);
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
