import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { registerUserResponse } from '../interface/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(document: string): Promise<registerUserResponse> {
    try {
      return lastValueFrom<registerUserResponse>(this.http.get<registerUserResponse>(`${environment.API}funcionarios/cedula/${document}`));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
