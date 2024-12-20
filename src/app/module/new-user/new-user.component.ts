import { Component, ViewChild } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { NewUser } from './interface/new-user.interface';
import { LoadingComponent } from '../../common/components/loading/loading.component';
import { MessagesComponent } from '../../common/components/messages/messages.component';
import { NewUserService } from './service/new-user.service';

@Component({
  selector: 'app-new-user',
  imports: [
    FormComponent,
    LoadingComponent,
    MessagesComponent
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  isLoading = false;

  @ViewChild('newMessage') messageComponent!: MessagesComponent;

  constructor(
    private newUserService: NewUserService
  ) {}

  async handleFormSubmit(formData: NewUser) {
    console.log('Form submitted:', formData);
    formData.siMercado = formData.siMercado ? 1 : 0;
    formData.siPartisipageneral = formData.siPartisipageneral ? 1 : 0;
    try {
      this.isLoading = true;
      const data = await this.newUserService.createUser(formData);
      this.messageComponent.showMessage('success', 'Usuario registrado', `El usuario ${formData.nombre} ha sido registrado con éxito`);
    } catch (error) {
      this.isLoading = false;
      this.messageComponent.showMessage('error', 'Error al registrar el usuario', 'Ha ocurrido un error al registrar el usuario, por favor intenta nuevamente');
    }finally {
      this.isLoading = false;
    }
  }
}
