import { Component, OnInit } from '@angular/core';
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

  constructor(private blogService: BlogService, private router:Router){
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadMorePosts();
  }

  goToPost(id:string){
    this.router.navigate(['/blog', id]);
  }

  loadPosts(): void{
    this.blogService.getLastPublishedPosts(3).
    subscribe((posts) => {
      this.mainPosts = posts;
      this.loading = false;
    });
  }

  loadMorePosts(): void{
    this.blogService.getAllPosts().
    subscribe((posts) => {
      this.blogPosts = posts;
      this.currentIndex += this.itemsPerPage;
    })
  }

}
