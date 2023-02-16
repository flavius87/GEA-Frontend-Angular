import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Icollection } from '../../interfaces/projects';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  @ViewChild('service') divservice!: ElementRef;
  @ViewChild('workGaleryWork') divworkGaleryWork!: ElementRef;
  //@ViewChild('workGaleryWorkTwo') divworkGaleryWorkTwo!: ElementRef;
  //@ViewChild('workGaleryWorkThree') divworkGaleryWorkThree!: ElementRef;

  scrollingService:boolean = false;
  scrollingWork:boolean = false;
  //scrollingWorkTwo:boolean = false;
  //scrollingWorkThree:boolean = false;
  icollections: Icollection [] = [];

  constructor(private dataService:DataService,
    private router:Router){}

  ngOnInit(): void {
    this.dataService.getWorks().subscribe(
      icollections => {
        this.icollections = icollections;
      }
    )
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll(){
    const windowHeight = window.innerHeight;

    const boundingRectService = this.divservice.nativeElement.getBoundingClientRect();
    const boundingRectWork = this.divworkGaleryWork.nativeElement.getBoundingClientRect();
   // const boundingRectWorkTwo = this.divworkGaleryWorkTwo.nativeElement.getBoundingClientRect();
   // const boundingRectWorkThree = this.divworkGaleryWorkThree.nativeElement.getBoundingClientRect();

    if(boundingRectService.top >= 0 && boundingRectService.bottom <= windowHeight) {
      this.scrollingService = true;
    } else if(boundingRectWork.top >= 0 && boundingRectWork.bottom <= windowHeight) {
      this.scrollingWork = true;
    } //else if(boundingRectWorkTwo.top >= 0 && boundingRectWorkTwo.bottom <= windowHeight) {
     // this.scrollingWorkTwo = true;
    //} else if(boundingRectWorkThree.top >= 0 && boundingRectWorkThree.bottom <= windowHeight) {
    //  this.scrollingWorkThree = true;
    //}

  }

  goToWork(id:string){
    this.router.navigate( ['/obras', id] )
  }

}
