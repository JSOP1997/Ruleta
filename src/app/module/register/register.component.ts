import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  document: string = '';

  onSubmit() {
    if (this.document) {
        console.log('Documento ingresado:', this.document);
    }
  }
}
