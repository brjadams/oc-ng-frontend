import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    formData.append("onetime", this.generateOneTime())
    return this.http.post('/api/login', formData);
  }

  private generateOneTime() {
    const dt = new Date()
    const min = (dt.getMinutes() < 10? '0' : '') + dt.getMinutes();
    return `${dt.getHours()}${min}`
  }
}
