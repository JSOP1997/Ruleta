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
      return lastValueFrom<registerUserResponse>(this.http.post<registerUserResponse>(`${environment.API}funcionarios/llego/${document}`, {document}));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
