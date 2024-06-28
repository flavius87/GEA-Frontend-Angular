import { Component, ElementRef, HostListener, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Obra } from '../../interfaces/projects';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @ViewChildren('workItem') workItems!: QueryList<ElementRef>;
  @ViewChild('service') divservice!: ElementRef;
  @ViewChild('workGaleryWork') divworkGaleryWork!: ElementRef;
  @ViewChild('about') divabout!: ElementRef;

  scrollingService:boolean = false;
  scrollingWork:boolean = false;
  scrollingAbout:boolean = false;
  obras: Obra [] = [];


  constructor(private dataService: DataService, private router: Router) {
  }

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

  ngAfterViewInit(): void {
    this.workItems.changes.subscribe((items) => {
      this.initializeObserver(items.toArray());
    });
  }

  loadWorks() {
    this.dataService.getWorks().subscribe({
      next: (obras) => {
        this.obras = obras;
        setTimeout(() => {
          this.initializeObserver(this.workItems.toArray());
        }, );
      },
      error: (err) => {
        console.error('Error al recuperar la obra:', err);
      }
    });
  }

  initializeObserver(elements: ElementRef[]) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fadeInUp');
          }, 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el.nativeElement));
  }

  goToWork(id:string){
    this.router.navigate( ['/obras', id] );
  }

}
