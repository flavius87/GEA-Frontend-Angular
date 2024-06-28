import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit{

  loading!:boolean;
  hasMorePost: boolean = true;
  blogPosts: any[]=[];
  mainPosts: any[]=[];
  categories: any;
  currentIndex: number = 1;
  itemsPerPage: number = 3;

  @ViewChildren('blogItem') blogItems!: QueryList<ElementRef>;

  constructor(private blogService: BlogService, private router:Router){
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadMorePosts();
  }

  goToPost(slug:string){
    this.router.navigate(['/blog', slug]);
  }

  loadPosts(): void{
    this.blogService.getLastPublishedPosts(3).
    subscribe((posts) => {
      this.mainPosts = posts;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.blogItems.changes.subscribe((items) => {
      this.initializeObserver(items.toArray());
    });
  }

  loadMorePosts(): void{
    this.blogService.getAllPosts().
    subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.currentIndex += this.itemsPerPage;
        setTimeout(() => {
          this.initializeObserver(this.blogItems.toArray());
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
            entry.target.classList.add('fadeIn');
          }, 800);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el.nativeElement));
  }

}
