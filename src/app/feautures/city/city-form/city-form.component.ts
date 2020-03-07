import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { uniqueNameValidator } from 'src/app/shared/validators/unique-city-name-validator.directive';
import { ICityAdd } from 'src/app/shared/interfaces/city-add';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  cityForm: FormGroup
  @Output() addCity: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private cityService: CityService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required], [uniqueNameValidator(this.cityService)],  { updateOn: blur }]
    });
  }

  onSubmit(): void {
    const city: ICityAdd = { name: this.cityName.trim() }; 
    this.addCity.emit(city);
    this.cityForm.reset();
  }

  get cityName(): string {
    return this.cityForm.value['cityName'];
  }

  get cityFormControls(): { [key: string]: AbstractControl } {
    return this.cityForm['controls'];
  }

}
