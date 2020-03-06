import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICityAdd } from '../shared/interfaces/city-add';
import { ICity } from '../shared/interfaces/city';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${environment.apiServer}/api/cities`)
  }

  addCity(city: ICityAdd) {
    return this.http.post<ICityAdd>(`${environment.apiServer}/api/city`,city);
  }

  refresh(): Observable<{}>{
    return this.http.put(`${environment.apiServer}/api/update`,'');
  }

  getCityByName(name: string): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${environment.apiServer}/api/unique-name?name=${name}`);
  }
}
