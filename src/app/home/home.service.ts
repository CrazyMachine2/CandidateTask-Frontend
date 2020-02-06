import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { City } from './city';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private url: string = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.url}/api/cities`)
  }

  addCity(city: City) {
    return this.http.post<City>(`${this.url}/api/city`,city);
  }

  refresh(): Observable<{}>{
    return this.http.put(`${this.url}/api/update`,'');
  }

  getCityByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.url}/api/unique-name?name=${name}`);
  }
}
