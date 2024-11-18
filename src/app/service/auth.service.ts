import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    const url = this.apiUrl + '/authenticate';
    return this.http.post<{ token: string }>(
      url,
      { username: username, password: password },
      httpOptions
    );
  }

  register(username: string, password: string): Observable<{ token: string }> {
    const url = this.apiUrl + '/register';
    return this.http.post<{ token: string }>(
      url,
      { username: username, password: password },
      httpOptions
    );
  }
}
