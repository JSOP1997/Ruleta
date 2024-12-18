import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

import * as XLSX from 'xlsx';
import { RouletteComponent } from './components/roulette/roulette.component';

@Component({
  selector: 'app-lottery',
  imports: [
    CommonModule,
    RouletteComponent
  ],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss'
})
export class LotteryComponent {
  participants: any[] = [];
  winner: string | null = null;
  isRolling: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileName: string | null = null; // Para mostrar el nombre del archivo

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


  startRaffle(): void {
    if (this.participants.length > 0) {
      this.isRolling = true;
      this.winner = null;
      this.rollRaffle();
    }
  }

  rollRaffle(): void {
    if (this.isRolling) {
      const randomIndex = Math.floor(Math.random() * this.participants.length);
      this.winner = this.participants[randomIndex];
      this.participants = this.participants.filter((element) => this.winner != element)
      // Stop the animation after a short delay
      setTimeout(() => {
        this.isRolling = false;
      }, 3000);
    }
  }
}
