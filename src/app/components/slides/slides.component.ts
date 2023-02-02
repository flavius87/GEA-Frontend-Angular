import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, {  Autoplay, Pagination, SwiperOptions } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-slides',
  template: `<swiper [config]="config" #usefulSwiper class="mySwiper">
    <ng-container *ngFor="let img of images">
      <ng-template swiperSlide>
          <div class="mySlider">
            <!--<h1 class="mySlider__title">{{img.title}}</h1>-->
          <picture>
              <source [srcset]="img.picweb" type="image/webp">
              <img [src]="img.pic" [alt]="img.alt">
          </picture>
          </div>
      </ng-template>
    </ng-container>
  </swiper>`,
  encapsulation: ViewEncapsulation.None
})
export class SlidesComponent implements OnInit{


  images: ISwipe[] = [
    {
      picweb: 'assets/images/casa-en-ostende.webp',
      pic: 'assets/images/casa-en-ostende.jpg',
      alt: 'Arquitectura y construcción de casa en Ostende',
      title: 'Estudio de Arquitectura & Construcción'
    }, {
      picweb: 'assets/images/construccion-en-seco.webp',
      pic: 'assets/images/construccion-en-seco.jpg',
      alt: 'Construcción en seco, casa en wood frame',
      title: 'Estudio de Arquitectura & Construcción'
    }, {
      picweb: 'assets/images/casa-en-poblet.webp',
      pic: 'assets/images/casa-en-poblet.jpg',
      alt: 'Diseño y proyecto arquitectónico',
      title: 'Estudio de Arquitectura & Construcción'
    }
  ];

  config: SwiperOptions = {
    slidesPerView:'auto',
    centeredSlides: true,
    lazy: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    pagination:{
      clickable: true
    }};

  constructor(){

  }

  ngOnInit(): void {

  }


}
export interface ISwipe {
  picweb:string;
  pic: string;
  alt: string;
  title?: string;
  subtitle?: string;
};
