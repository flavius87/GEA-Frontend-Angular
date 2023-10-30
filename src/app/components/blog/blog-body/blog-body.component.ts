import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-blog-body',
  templateUrl: './blog-body.component.html',
  styleUrls: ['./blog-body.component.css']
})
export class BlogBodyComponent implements OnInit{

  @ViewChild('title') subjectElement!: ElementRef;
  @ViewChild('contentContainer') contentContainer!: ElementRef;
  @ViewChild('blogImage') blogImageElement!: ElementRef;
  loading!: boolean;
  blogPost: any;
  linkCopied: boolean = false;
  metaTitle!: string;
  metaDescription!: string;

  /* Share Social Media */
  postUrl: string = encodeURIComponent(document.location.href);
  recipient: string = 'destinatario@example.com';

  constructor(private route:ActivatedRoute,
    private blogService:BlogService,
    private title:Title,
    private meta:Meta){
    this.loading = true;
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => { this.getPost( params['slug'] );
    }
    );

    this.blogService.getPostById('slug').subscribe( data => {
      this.metaTitle = this.blogPost.fields.metaTitle;
      this.metaDescription = this.blogPost.fields.metaDescription;

      this.updateTitleTag(this.metaTitle);
      this.updateMetaTag(this.metaDescription);
    }
    )

  }

  updateTitleTag(metaTitle: string) {
    this.title.setTitle( metaTitle );
  }

  updateMetaTag(metaDescription: string) {
    this.meta.updateTag({ name: 'description', content: metaDescription });
  }

  getPost(slug: string) {
    this.loading = true;
    this.blogService.getPostBySlug(slug).subscribe({
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
    const title = this.subjectElement.nativeElement.textContent;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${this.postUrl}&title=${title}`;
    console.log(this.postUrl);
    window.open(url, '_blank');
  }

  shareOnLinkedIn(){
    const title = this.subjectElement.nativeElement.textContent;
    const img = this.blogImageElement.nativeElement.getAttribute('src');
    const url = `https://www.linkedin.com/shareArticle?url=${this.postUrl}&title=${title}&source=${img}`;
    console.log(this.postUrl);
    window.open(url, '_blank');
  }

  shareOnPinterest(){
    const title = this.subjectElement.nativeElement.textContent;
    const img = this.blogImageElement.nativeElement.getAttribute('src');
    const url = `https://pinterest.com/pin/create/bookmarklet/?&url=${this.postUrl}&description=${title}&media=${img}`;
    console.log(this.postUrl);
    window.open(url, '_blank');
  }

  shareOnWhatsApp(){
    const title = this.subjectElement.nativeElement.textContent;
    const url = `https://api.whatsapp.com/send?text=${title}%0A${this.postUrl}`;
    window.open(url, '_blank');
  }

  shareOnEmail() {
    const title = this.subjectElement.nativeElement.textContent;

    const subject = encodeURIComponent(title);

    const mailtoLink = `mailto:${this.recipient}?subject=${subject}&body=${this.postUrl}`;
    window.open(mailtoLink);
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
