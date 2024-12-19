import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NewUser } from '../interface/new-user.interface';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private http: HttpClient) { }

  createUser(data: NewUser) {
    try {
      return lastValueFrom(this.http.post(`${environment.API}funcionarios/create`, data));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
