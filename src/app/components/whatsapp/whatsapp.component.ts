import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  template: `
  <div class="whatsapp container">
    <a href="https://api.whatsapp.com/send?phone=5492214591846&text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n"
        class="float" target="_blank">
        <img src="/assets/icons/whatsapp.svg" alt="icono de whatsapp">
    </a>
  </div>`,
})
export class WhatsappComponent {

}
