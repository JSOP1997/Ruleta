import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-gifts',
  imports: [
    CommonModule
  ],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss'
})
export class GiftsComponent {
  selectedGiftType: string | null = null;
  giftTypes: string[] = ['Mercado', 'General'];
  sendType = output<string>();


  selectGiftType(giftType: string) {
    this.selectedGiftType = giftType;
    this.sendType.emit(giftType.toLowerCase());
  }
}
