import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './common/components/menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
