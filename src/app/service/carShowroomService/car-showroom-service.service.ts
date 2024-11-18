import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CarShowroom from '../../interface/CarShowroom';
import Pagination from '../../interface/Pagination ';

@Injectable({
  providedIn: 'root',
})
export class CarShowroomService {
  private apiUrl = 'http://localhost:8080/api/car-showrooms';

  constructor(private http: HttpClient) {}

  getAllCarShowroom(
    pageNumber: number,
    pageSize: number,
    field: string
  ): Observable<Pagination<CarShowroom>> {
    const url = this.apiUrl + `/${pageNumber}/${pageSize}/${field}`;
    return this.http.get<Pagination<CarShowroom>>(url, this.getHttpHeader());
  }

  getCarShowroomById(carShowroomId?: number): Observable<CarShowroom> {
    const url = this.apiUrl + `/${carShowroomId}`;
    return this.http.get<CarShowroom>(url, this.getHttpHeader());
  }

  addCarShowroom(carShowRoom: CarShowroom): Observable<CarShowroom> {
    return this.http.post<CarShowroom>(
      this.apiUrl,
      carShowRoom,
      this.getHttpHeader()
    );
  }

  deleteCarShowroom(carShowRoomId?: number): Observable<CarShowroom> {
    const url = this.apiUrl + `/${carShowRoomId}`;
    return this.http.delete<CarShowroom>(url, this.getHttpHeader());
  }

  updateCarShowroom(carShowRoom: CarShowroom): Observable<CarShowroom> {
    const url = this.apiUrl + `/${carShowRoom.id}`;
    return this.http.put<CarShowroom>(url, carShowRoom, this.getHttpHeader());
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
