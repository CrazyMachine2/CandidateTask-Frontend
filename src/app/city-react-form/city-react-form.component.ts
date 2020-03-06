import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { uniqueNameValidator } from '../shared/unique-city-name-validator.directive'
import { HomeService } from '../home/home.service';
import { ICityAdd } from '../shared/interfaces/city-add';


@Component({
  selector: 'app-city-react-form',
  templateUrl: './city-react-form.component.html',
  styleUrls: ['./city-react-form.component.css']
})
export class CityReactFormComponent implements OnInit {
  cityForm: FormGroup
  @Output() addCity: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private homeService: HomeService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required], [uniqueNameValidator(this.homeService)],  { updateOn: blur }]
    });
  }

  onSubmit() {
    const city: ICityAdd = { name: this.cityName.trim() }; 
    this.addCity.emit(city);
    this.cityForm.reset();
  }

  get cityName() {
    return this.cityForm.value['cityName'];
  }

  get cityFormControls(): any {
    return this.cityForm['controls'];
  }

}
