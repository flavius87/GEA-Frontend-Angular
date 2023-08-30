import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import { ToHtmlPipe } from 'src/app/pipes/to-html.pipe';


@Component({
  selector: 'app-blog-body',
  templateUrl: './blog-body.component.html',
  styleUrls: ['./blog-body.component.css']
})
export class BlogBodyComponent implements OnInit{


  loading!: boolean;
  blogPost: any;
  linkCopied: boolean = false;

  /* Share Social Media */
  postUrl: string = encodeURI(document.location.href);
  postTitle: string = encodeURIComponent(document.title);
  recipient: string = 'destinatario@example.com';


  constructor(private route:ActivatedRoute, private blogService:BlogService){
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => { this.getPost( params['id'] );
    }
    );
  }

  getPost(id: string) {
    this.loading = true;
    this.blogService.getPostById(id).subscribe({
      next: (post) => {
        this.blogPost = post;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al recuperar el post:', err);
        this.loading = false;
      }
    });
  }


  shareOnFacebook(){
    const url = `https://www.facebook.com/sharer/sharer.php?u=${this.postUrl}`;
    window.open(url, '_blank');
  }

  shareOnLinkedin(){
    const url = `https://www.linkedin.com/shareArticle?url=${this.postUrl}&title=${this.postTitle}`;
    window.open(url, '_blank');
  }

  shareOnPinterest(){
    const pinterestImg = document.getElementById('blogImage');
    const url = `https://pinterest.com/pin/create/bookmarklet/?media=${pinterestImg}&url=${this.postUrl}&description=${this.postTitle}`;
    window.open(url, '_blank');
  }

  shareOnWhatsApp(){
    const url = `https://api.whatsapp.com/send?text=${this.postTitle} ${this.postUrl}`;
    window.open(url, '_blank');
  }

  shareOnEmail() {
    const subject = document.getElementById('subject');
    const body = document.querySelectorAll('.blog__content');
    const mailtoLink = `mailto:${this.recipient}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  }

  copyLinkToClipboard() {

    const tempInput = document.createElement('input');
    tempInput.value = this.postUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    this.linkCopied = true;

    setTimeout(() => {
      this.linkCopied = false;
    }, 2000);
  }

}
