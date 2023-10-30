import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Obra } from 'src/app/interfaces/projects';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
})
export class ObrasComponent implements OnInit {

  fade:boolean = false;
  loading!:boolean;
  scrollingFadeInTwo:boolean = false;
  scrollingAbout:boolean = false;
  windowOpen:boolean = false;
  windowOpenTwo:boolean = false;
  windowOpenThree:boolean = false;
  windowOpenFour:boolean = false;
  windowOpenFive:boolean = false;
  controls:boolean = true;
  metaTitle!:string;
  metaDescription!:string;


  @ViewChild('projectTwo') divprojectTwo!: ElementRef;
  @ViewChild('about') divabout!: ElementRef;
  obra!: Obra;


  constructor(private dataService:DataService,
    private readonly route:ActivatedRoute,
    private title:Title,
    private meta:Meta){
      this.loading = true;
    }

  ngOnInit(): void{
    this.route.params.subscribe( params => {
      this.getWork( params['id'] );
    })

    this.dataService.getWork('id').subscribe( data => {
      this.metaTitle = this.obra.metaTitle;
      this.metaDescription = this.obra.metaDescription;

      this.updateTitleTag(this.metaTitle);
      this.updateMetaTag(this.metaDescription);
    })

    const tag = document.createElement('script');

  	tag.src = "https://www.youtube.com/iframe_api";

  	document.body.appendChild(tag);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const referencePoint = windowHeight / 2; // Punto de referencia vertical

    const aboutElement = this.divabout.nativeElement;
    const aboutTop = aboutElement.offsetTop; // Posición superior del elemento #about
    const aboutBottom = aboutTop + aboutElement.offsetHeight; // Posición inferior del elemento #about
    const boundingRectFadeInTwo = this.divprojectTwo.nativeElement.getBoundingClientRect();

    // Verifica si el punto de referencia está dentro del elemento #about
    if (scrollPosition + referencePoint >= aboutTop && scrollPosition + referencePoint <= aboutBottom) {
      this.scrollingAbout = true;
    } else if (boundingRectFadeInTwo.top >= 0 && boundingRectFadeInTwo.bottom <= windowHeight) {
      this.scrollingFadeInTwo = true;
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeyescapeHandler(event: KeyboardEvent) {
    this.close();
  }

  @HostListener('document:keydown.arrowLeft', ['$event']) onKeyLeftHandler(event: KeyboardEvent) {
    this.prev();
  }

  @HostListener('document:keydown.arrowRight', ['$event']) onKeyRightHandler(event: KeyboardEvent) {
    this.next();
  }


  updateTitleTag(metaTitle: string) {
    this.title.setTitle( metaTitle );
  }

  updateMetaTag(metaDescription: string) {
    this.meta.updateTag({ name: 'description', content: metaDescription });
  }

  getWork(id: string) {
    this.loading = true;
    this.dataService.getWork(id).subscribe({
      next: (obra) => {
        this.obra = obra;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al recuperar la obra:', err);
        this.loading = false;
      }
    });
  }



  imageOpen(){
    this.windowOpen = !this.windowOpen;
  }

  imageOpenTwo(){
    this.windowOpenTwo = !this.windowOpenTwo;
  }

  imageOpenThree(){
    this.windowOpenThree = !this.windowOpenThree;
  }

  imageOpenFour(){
    this.windowOpenFour = !this.windowOpenFour;
  }

  imageOpenFive(){
    this.windowOpenFive = !this.windowOpenFive;
  }

  close(){
    if(this.windowOpen) {this.windowOpen = !this.windowOpen}
    else if(this.windowOpenTwo) {this.windowOpenTwo = !this.windowOpenTwo}
    else if (this.windowOpenThree) {this.windowOpenThree = !this.windowOpenThree}
    else if (this.windowOpenFour) {this.windowOpenFour = !this.windowOpenFour}
    else if (this.windowOpenFive) {this.windowOpenFive = !this.windowOpenFive};
  }

  prev():void{
    if(typeof this.obra.jpg[2] === 'undefined') {
      this.windowOpen = !this.windowOpen
      }
    if(this.windowOpen) {
      this.windowOpen = !this.windowOpen
      this.windowOpenFour = !this.windowOpenFour}
    else if(this.windowOpenTwo) {
      this.windowOpenTwo = !this.windowOpenTwo
      this.windowOpen = !this.windowOpen}
    else if (this.windowOpenThree) {
      this.windowOpenThree = !this.windowOpenThree
      this.windowOpenTwo = !this.windowOpenTwo}
    else if (this.windowOpenFour) {
      this.windowOpenFour = !this.windowOpenFour
      this.windowOpenThree = !this.windowOpenThree};
  }


  next(){

    if(typeof this.obra.jpg[2] === 'undefined') {
      this.windowOpen = !this.windowOpen
      }
    if(this.windowOpen) {
      this.windowOpen = !this.windowOpen
      this.windowOpenTwo = !this.windowOpenTwo}
    else if(this.windowOpenTwo) {
      this.windowOpenTwo = !this.windowOpenTwo
      this.windowOpenThree = !this.windowOpenThree}
    else if (this.windowOpenThree) {
      this.windowOpenThree = !this.windowOpenThree
      this.windowOpenFour = !this.windowOpenFour}
    else if (this.windowOpenFour) {
      this.windowOpenFour = !this.windowOpenFour
      this.windowOpen = !this.windowOpen};
  }

}


