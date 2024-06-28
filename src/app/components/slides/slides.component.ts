import { Component } from '@angular/core';

@Component({
  selector: 'app-slides',
  template: `<div>
  <video loop muted autoplay oncanplay="this.play()" onloadedmetadata="this.muted = true">
  <source type="video/mp4" src="assets/videos/Ribera-Bell-Obra-en-Construccion.mp4">
  <!--<source type="video/webm" src="assets/videos/gea-arquitectura-construcciones.webm">-->
  </video>
            </div>`,})
export class SlidesComponent {



}
