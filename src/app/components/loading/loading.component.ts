import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loading container animate__animated fadeIn">
  <figure>
    <img src="assets/icons/loader.svg" alt="loading" class='spin rotate__180'>
  </figure>
  </div>`,
  styles: [''],
})
export class LoadingComponent {

}
