import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { Observable, of, timer } from 'rxjs';
import { map,switchMap, debounceTime } from 'rxjs/operators'

import { Directive } from '@angular/core';


export function uniqueNameValidator(homeService: HomeService): AsyncValidatorFn {
    return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return timer(300).pipe(
            switchMap(() => {
                if(!c.value){
                    return of(null)
                }
                return homeService.getCityByName(c.value).pipe(
                    map(cities => {
                        return cities && cities.length > 0 ? { 'uniqueCityNameValidator': true } : null;
                    })
                );
            })
        );
    }
};

@Directive({
    selector: '[uniqueCityNameValidator]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueCityNameDirective, multi: true }]
})

export class UniqueCityNameDirective implements AsyncValidator {

    constructor(private homeService: HomeService) { }

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.homeService.getCityByName(c.value).pipe(
            map(cities => {
                return cities && cities.length > 0 ? { 'uniqueCityNameValidator': true } : null;
            })
        );
    }
}