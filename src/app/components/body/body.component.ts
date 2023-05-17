import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Obra } from '../../interfaces/projects';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  @ViewChild('service') divservice!: ElementRef;
  @ViewChild('workGaleryWork') divworkGaleryWork!: ElementRef;
  @ViewChild('about') divabout!: ElementRef;

  scrollingService:boolean = false;
  scrollingWork:boolean = false;
  scrollingAbout:boolean = false;
  obras: Obra [] = [];

  constructor(private dataService:DataService,
    private router:Router){}

  ngOnInit(): void {
    this.loadWorks();
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll(){
    const windowHeight = window.innerHeight;

    const boundingRectService = this.divservice.nativeElement.getBoundingClientRect();
    const boundingRectWork = this.divworkGaleryWork.nativeElement.getBoundingClientRect();
    const boundingRectAbout = this.divabout.nativeElement.getBoundingClientRect();

    if(boundingRectService.top >= 0 && boundingRectService.bottom <= windowHeight) {
      this.scrollingService = true;
    } else if(boundingRectWork.top >= 0 && boundingRectWork.bottom <= windowHeight) {
      this.scrollingWork = true;
    } else if(boundingRectAbout.top >= 0 && boundingRectAbout.bottom <= windowHeight) {
      this.scrollingAbout = true;
     }

  }

  loadWorks() {
    this.dataService.getWorks().pipe(
      tap((obras) => console.log('Obra recuperada:', obras)),
      catchError((err) => {
        console.error('Error al recuperar la obra:', err);
        return throwError(err);
      })
    ).subscribe(obras => this.obras = obras);
  }

  goToWork(id:string){
    this.router.navigate( ['/obras', id] )
  }

}
