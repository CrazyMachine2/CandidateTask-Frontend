import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityFormComponent } from './city-form/city-form.component';
import { CityListComponent } from './city-list/city-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CityFormComponent, CityListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CityListComponent],
})
export class CityModule { }
