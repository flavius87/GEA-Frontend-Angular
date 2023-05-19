import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Obra } from 'src/app/interfaces/projects';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit{

  fade:boolean = false;
  loading!:boolean;
  scrollingFadeInTwo!:boolean;
  scrollingAbout:boolean = false;
  windowOpen:boolean = false;
  windowOpenTwo:boolean = false;
  windowOpenThree:boolean = false;
  windowOpenFour:boolean = false;
  windowOpenFive:boolean = false;
  controls:boolean = true;


  @ViewChild('projectTwo') divprojectTwo!: ElementRef;
  @ViewChild('about') divabout!: ElementRef;
  obra!: Obra;


  constructor(private dataService:DataService,
    private readonly route:ActivatedRoute){
      this.loading = true;
    }

  ngOnInit(): void{
    this.route.params.subscribe( params => {
      console.log(params['id']);
      this.getWork( params['id'] );
    })

    const tag = document.createElement('script');

  	tag.src = "https://www.youtube.com/iframe_api";

  	document.body.appendChild(tag);
  }

  @HostListener('document:scroll', ['$event'])
    public onViewportScroll(){
      const windowHeight = window.innerHeight;

      const boundingRectFadeInTwo = this.divprojectTwo.nativeElement.getBoundingClientRect();
      const boundingRectAbout = this.divabout.nativeElement.getBoundingClientRect();

      if(boundingRectFadeInTwo.top >= 0 && boundingRectFadeInTwo.bottom <= windowHeight) {
        this.scrollingFadeInTwo = true;
      } else if(boundingRectAbout.top >= 0 && boundingRectAbout.bottom <= windowHeight) {
        this.scrollingAbout = true;
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


