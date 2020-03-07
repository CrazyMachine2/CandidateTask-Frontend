import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/shared/interfaces/city';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICityAdd } from 'src/app/shared/interfaces/city-add';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: ICity[];

  constructor(private cityService: CityService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.spinnerService.show();
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities
      this.spinnerService.hide();
    });
  }

  addCity(city: ICityAdd): void {
    this.spinnerService.show();
    this.cityService.addCity(city).subscribe(() => {
      this.getCities()
      this.spinnerService.hide();
    });
  }

  update(): void {
    this.spinnerService.show();
    this.cityService.refresh().subscribe(() => {
      this.getCities();
      this.spinnerService.hide();
    });
  }

}
