import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewUser } from '../../interface/new-user.interface';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Output() formSubmit = new EventEmitter<NewUser>();

  formData = {
    cedula: '',
    nombre: '',
    siPartisipageneral: false,
    siMercado: false
  };

  onSubmit() {
    this.formSubmit.emit(this.formData);
  }
}
