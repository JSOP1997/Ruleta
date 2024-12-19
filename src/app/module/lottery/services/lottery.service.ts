import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { LotteryParticipant } from '../interface/lottery.interface';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http: HttpClient) {}

  getTypeLottery(type: string): Promise<LotteryParticipant[]> {
    try {
      return lastValueFrom<LotteryParticipant[]>(this.http.get<LotteryParticipant[]>(`${environment.API}funcionarios/sorteo${type}`));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  registerWinner(document: string, type: string): Promise<any> {
    try {
      return lastValueFrom<any>(this.http.post<any>(`${environment.API}funcionarios/${type}/${document}`, { cedula: document }));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
