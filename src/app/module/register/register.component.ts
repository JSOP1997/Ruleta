import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './service/register.service';
import { MessagesComponent } from '../../common/components/messages/messages.component';
import { registerUserResponse } from './interface/register.interface';
import { LoadingComponent } from '../../common/components/loading/loading.component';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    MessagesComponent,
    LoadingComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  document: string = '';
  isLoading: boolean = false;

  @ViewChild('newMessage') messageComponent!: MessagesComponent;

  constructor(
    private registerService: RegisterService
  ) {}

  async onSubmit() {
    if (this.document) {
        console.log('Documento ingresado:', this.document);
        try {
          this.isLoading = true;
          const data: registerUserResponse = await this.registerService.registerUser(this.document);
          this.messageComponent.showMessage('success', 'Usuario registrado', `El usuario ${data.nombre} ha sido registrado con éxito`);
        } catch (error: any) {
          if(error.status === 404) {
            this.messageComponent.showMessage('error', 'Usuario no encontrado', 'El usuario no ha sido encontrado en la base de datos');
          } else {
            this.messageComponent.showMessage('error', 'Error al registrar el usuario', 'Ha ocurrido un error al registrar el usuario, por favor intenta nuevamente');
          }
          this.isLoading = false;
        } finally {
          this.isLoading = false;
        }
    }
  }
}
