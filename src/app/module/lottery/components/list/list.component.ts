import { Component, input } from '@angular/core';
import { LotteryParticipant } from '../../interface/lottery.interface';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  listParticipants = input<LotteryParticipant[]>([]);
}
