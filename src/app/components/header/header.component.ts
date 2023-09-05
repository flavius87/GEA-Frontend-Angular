import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  myNav:boolean = false;
  menuHamburguer:boolean = false;
  menuClose:boolean = false;

  constructor(private router: Router){}

  /*@HostListener('window:scroll', ['$event'])onscroll(){
    if(window.scrollY > 100)
    {
      this.myNav = true;
    }
    else{
      this.myNav = false;
    }
  }*/

  menuOpen() {
    this.menuHamburguer = !this.menuHamburguer;
    this.menuClose = !this.menuClose;
  }

  onNav(url:any) {
    this.router.navigateByUrl('#' + url);
    if(screen.width < 768){
      this.menuOpen();
    }
  }

  onBlog(url:any) {
    this.router.navigateByUrl(url);
    if(screen.width < 768){
      this.menuOpen();
    }
  }

}
