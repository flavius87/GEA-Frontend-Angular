import { Component } from '@angular/core';

@Component({
  selector: 'app-head',
  template: `<div class="blog__main">
  <div class="banner__title container">
  <img class="dialog animate__rubberBand" src="/assets/icons/dialogo.png" alt="dialogo">
  <p class="title animate__lightSpeedInRight">Hablemos de Arquitectura</p>
  </div>
  <img class="banner" src="/assets/images/banner/portada_blog_gea.jpg" alt="Portada del blog de Gea Arquitectura">
  </div>`,
  styles: [`.blog__main{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1em;
  }

  .blog__main .banner{
    width: 100%;
    object-fit: cover;
    object-position: center top;
    max-height: 20em;
  }

  .blog__main .banner__title{
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10%;
  }

  .banner__title img{
    width: 25%;
    margin-top: 8%;
    display: flex;
    justify-content: center;
    filter: drop-shadow(6px 2px 8px #35565b);
  }

  .blog__main .title{
    color: var(--white);
    font-size: 26px;
    font-weight: 400;
    margin-top: 4%;
    text-transform: uppercase;
    text-shadow: 3px 1px 6px #454445;
    text-align: center;
  }
  @media (min-width:768px){
    .blog__main .title{
    font-size: 60px;
    margin-top: 0px;
  }}`]
})
export class HeadComponent {

}
