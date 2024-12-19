import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import * as XLSX from 'xlsx';
import { RouletteComponent } from './components/roulette/roulette.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { MessagesComponent } from '../../common/components/messages/messages.component';
import { LotteryService } from './services/lottery.service';
import { LotteryParticipant } from './interface/lottery.interface';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-lottery',
  imports: [
    CommonModule,
    RouletteComponent,
    GiftsComponent,
    MessagesComponent,
    ListComponent
  ],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LotteryComponent {
  participants: any[] = [];
  winner: LotteryParticipant | null = null;
  isRolling: boolean = false;
  spinDuration: number = 10; // Default spin duration

  isLoading: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('messageComponent') messageComponent!: MessagesComponent;
  fileName: string | null = null;
  ListParticipants!: LotteryParticipant[];
  type!: string;

  constructor(
    private lotteryService: LotteryService
  ) {}

  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Abre el input oculto al hacer clic en el área
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name; // Guarda el nombre del archivo para mostrarlo en la interfaz
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const wb = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.participants = data.flat();
      };
      reader.readAsBinaryString(file);
    }
  }

  async winnerSelected(winner: LotteryParticipant) {
    this.winner = winner;
    
    try {
      this.isLoading = true;
      const data = await this.lotteryService.registerWinner(winner.cedula, this.type);
      this.messageComponent.showMessage('success', 'Ganador seleccionado', `El ganador es: ${winner.nombre} - ${winner.cedula}`, './gif.gif');
      this.getLotteryType(this.type);
    } catch (error) {
      this.isLoading = false;
      this.messageComponent.showMessage('error', 'Error al seleccionar el ganador', 'Ocurrió un error al seleccionar el ganador');
    } finally {
      this.isLoading = false;
    }
  }

  async getLotteryType(type: string) {
    this.type = type;
    try {
      this.isLoading = true;
      const data: LotteryParticipant[]  = await this.lotteryService.getTypeLottery(type);
      this.ListParticipants = data;
    } catch (error: any) {
      console.error('Error al seleccionar el tipo de sorteo:', error);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }
}
