import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, output } from '@angular/core';
import { SwiperModule } from 'swiper/types';
import { LotteryParticipant } from '../../interface/lottery.interface';

@Component({
  selector: 'app-roulette',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.scss'
})
export class RouletteComponent {
  @Input() items: LotteryParticipant[] = []; // Personas que estarán en la ruleta
  @Input() spinDuration: number = 20; // Duración del giro rápido (en segundos)
  @Input() stopDelay: number = 1; // Tiempo de retardo después de que la ruleta se detiene
  isSpinning: boolean = false;
  selectedPerson: LotteryParticipant | null = null;
  currentIndex: number = 0;
  winner = output<LotteryParticipant>();

  spinClass: string = '';
  private spinInterval: any;
  private currentRotation: number = 0;

  startSpin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.selectedPerson = null;

    // Configura el giro rápido
    let rotationSpeed = 20; // Cuanto menor, más rápido
    let numberOfSpins = Math.floor(Math.random() * 3) + 3; // Número aleatorio de vueltas antes de detenerse

    this.spinClass = 'spinning';

    // Anima el giro
    this.spinInterval = setInterval(() => {
      this.currentRotation += rotationSpeed;
      if (this.currentRotation >= numberOfSpins * 100) {
        clearInterval(this.spinInterval);
        this.stopSpin();
      }
    }, 500);
  }

  private stopSpin() {
    // Simula la parada de la ruleta con un retraso
    setTimeout(() => {
      // Selección aleatoria
      const randomIndex = Math.floor(Math.random() * this.items.length); 
      this.selectedPerson = this.items[randomIndex];
      this.currentIndex = randomIndex;

      this.winner.emit(this.selectedPerson);

      // Calcular la posición final
      const itemHeight = 100 / this.items.length;
      const finalPosition = randomIndex * itemHeight;
      document.querySelector('.roulette')?.setAttribute('style', `transform: translateY(-${finalPosition}%)`);

      this.isSpinning = false;
      this.spinClass = '';
    }, this.stopDelay * 1000);
  }

  // Método para reiniciar la selección sin perder la lista
  resetSpin() {
    this.selectedPerson = null;
    this.currentRotation = 0;
    this.currentIndex = 0;
    document.querySelector('.roulette')?.setAttribute('style', `transform: translateY(0)`);
  }
}
