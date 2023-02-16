import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit{

  fade:boolean = false;
  loading!:boolean;
  scrollingFadeIn!:boolean;
  scrollingbgVariable:boolean = false;
  windowOpen:boolean = false;
  windowOpenTwo:boolean = false;
  windowOpenThree:boolean = false;
  windowOpenFour:boolean = false;
  windowOpenFive:boolean = false;
  controls:boolean = true;


  @ViewChild('project') divproject!: ElementRef;
  icollection: any = {};


  constructor(private dataService:DataService,
    private readonly route:ActivatedRoute){
      this.loading = true;
      this.scrollingFadeIn = false;
    }

  ngOnInit(): void{
    this.route.params.subscribe( params => {
      this.getWork( params['id'] );
    })

    const tag = document.createElement('script');

  	tag.src = "https://www.youtube.com/iframe_api";

  	document.body.appendChild(tag);
  }

  @HostListener('document:scroll', ['$event'])
    public onViewportScroll(){
      const windowHeight = window.innerHeight;

      const boundingRectFadeIn = this.divproject.nativeElement.getBoundingClientRect();

      if(boundingRectFadeIn.top >= 0 && boundingRectFadeIn.bottom <= windowHeight) {
        this.scrollingFadeIn = true;
      }
    }
  @HostListener('window:scroll', ['$event'])onScroll(){
    if(window.scrollY > 800){
      this.scrollingbgVariable = true;
    }
    else{
      this.scrollingbgVariable = false;
    }
  }

  getWork( id:string ){
    this.loading = true;
    this.dataService.getWork( id ).subscribe(
      icollection => {console.log(icollection);
      this.icollection = icollection;
      this.loading = false;
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
    if(typeof this.icollection.src[3] === 'undefined') {
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

    if(typeof this.icollection.src[3] === 'undefined') {
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
    /*if(this.windowOpen) {
      this.windowOpen = !this.windowOpen
      this.windowOpenTwo = !this.windowOpenTwo}
    else{this.windowOpen = !this.windowOpen}
    if(this.windowOpenTwo) {
      this.windowOpenTwo = !this.windowOpenTwo
      this.windowOpenThree = !this.windowOpenThree}
    else if (this.windowOpenThree) {
      this.windowOpenThree = !this.windowOpenThree
      this.windowOpenFour = !this.windowOpenFour}
    else if (this.windowOpenFour) {
      this.windowOpenFour = !this.windowOpenFour
      this.windowOpen = !this.windowOpen};*/
  }

}


