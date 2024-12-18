import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { SwiperModule } from 'swiper/types';

@Component({
  selector: 'app-roulette',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.scss'
})
export class RouletteComponent {
  @Input() items: string[] = []; // Personas que estarán en la ruleta
  @Input() spinDuration: number = 3; // Duración del giro rápido (en segundos)
  @Input() stopDelay: number = 1; // Tiempo de retardo después de que la ruleta se detiene
  isSpinning: boolean = false;
  selectedPerson: string | null = null;
  currentIndex: number = 0;

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
      document.querySelector('.roulette')?.setAttribute('style', `transform: translateY(-${this.currentRotation}%)`);
      
      if (this.currentRotation >= numberOfSpins * 100) {
        clearInterval(this.spinInterval);
        this.stopSpin();
      }
    }, 100);
  }

  private stopSpin() {
    // Simula la parada de la ruleta con un retraso
    setTimeout(() => {
      // Selección aleatoria
      const randomIndex = Math.floor(Math.random() * this.items.length); 
      this.selectedPerson = this.items[randomIndex];
      this.currentIndex = randomIndex; // Guardamos el índice para el marcador
      this.isSpinning = false;
      this.spinClass = '';
    }, this.stopDelay * 1000);
  }

  // Método para reiniciar la selección sin perder la lista
  resetSpin() {
    this.selectedPerson = null;
    this.currentRotation = 0;
    this.currentIndex = 0;
  }
}
