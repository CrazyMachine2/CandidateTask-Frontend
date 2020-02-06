import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, FormBuilder, Validators } from '@angular/forms'
import { HomeComponent } from '../home/home.component';
import { uniqueNameValidator } from '../shared/unique-city-name-validator.directive'
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-city-react-form',
  templateUrl: './city-react-form.component.html',
  styleUrls: ['./city-react-form.component.css']
})
export class CityReactFormComponent implements OnInit {
  cityForm: FormGroup

  constructor(private homeComponent: HomeComponent, private fb: FormBuilder, private homeService: HomeService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.cityForm = this.fb.group({
      cityName:['', Validators.required, uniqueNameValidator(this.homeService)]
    });
  }

  onSubmit(){
    this.homeComponent.addCity(this.cityName);
    this.cityForm.reset();
  }

  get cityName(){
    return this.cityForm.value['cityName'];
  }

  get cityFormControls(): any {
    return this.cityForm['controls'];
  }

}
