import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { Icollection } from '../../../interfaces/projects';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit{

  fade:boolean = false;
  scrollingFadeIn:boolean = false;
  scrollingFadeInTwo:boolean = false;
  scrollingFadeInThree:boolean = false;
  scrollingbgVariable:boolean = false;

  @ViewChild('project') divproject!: ElementRef;
  @ViewChild('projectTwo') divprojectTwo!: ElementRef;
  @ViewChild('projectThree') divprojectThree!: ElementRef;
  icollections: Icollection[]=[];
  icollection: any = {};

  constructor(private dataService:DataService,
    private readonly route:ActivatedRoute,
    private _sanitizer: DomSanitizer){}

  ngOnInit(): void{
    this.route.params.subscribe( params => {
      this.icollection = this.dataService.getWork( params['url'] );
    })
    this.dataService.getWorks().subscribe(
      icollections => {this.icollections = icollections})
  }

  @HostListener('document:scroll', ['$event'])
    public onViewportScroll(){
      const windowHeight = window.innerHeight;

      const boundingRectFadeIn = this.divproject.nativeElement.getBoundingClientRect();
      const boundingRectFadeInTwo = this.divprojectTwo.nativeElement.getBoundingClientRect();
      const boundingRectFadeInThree = this.divprojectThree.nativeElement.getBoundingClientRect();

      if(boundingRectFadeIn.top >= 0 && boundingRectFadeIn.bottom <= windowHeight) {
        this.scrollingFadeIn = true;
      } else if(boundingRectFadeInTwo.top >= 0 && boundingRectFadeInTwo.bottom <= windowHeight) {
        this.scrollingFadeInTwo = true;
      } else if(boundingRectFadeInThree.top >= 0 && boundingRectFadeInThree.bottom <= windowHeight) {
        this.scrollingFadeInThree = true;
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

  getVideoIframe(url:any) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}

}


