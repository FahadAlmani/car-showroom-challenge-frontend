import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Car from '../../interface/Car';
import Pagination from '../../interface/Pagination ';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/car';

  constructor(private http: HttpClient) {}

  getAllCarByShowroomId(
    carShowroomId: number,
    pageNumber: number,
    pageSize: number,
    field: string,
    value: string
  ): Observable<Pagination<Car>> {
    const url =
      this.apiUrl +
      `/${carShowroomId}/${pageNumber}/${pageSize}/${field}/${value}`;
    return this.http.get<Pagination<Car>>(url, this.getHttpHeader());
  }

  addCarToShowroom(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, this.getHttpHeader());
  }

  private getHttpHeader() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpOptions;
  }
}
