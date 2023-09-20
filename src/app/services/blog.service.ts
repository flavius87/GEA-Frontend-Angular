import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  })

  getAllPosts():Observable<any[]>{
    return from(this.client.getEntries({
      content_type: 'blogPost',
      order: 'sys.createdAt',
      include: 1
    })).pipe(
      map((blogPosts: any) => blogPosts.items),
      map(items => items.slice(0, -3)),
      catchError((error) => {
      console.error('Error al obtener los posts:', error);
      return throwError('Error en la obtención de posts.');
    })
  );
  }

  getPostById(slug:string):Observable<any>{
    return from(this.client.getEntries({
      'fields.slug': slug,
      'content_type': 'blogPost'
     })).pipe(
      map((response: any) => {
        if (response.items.length > 0) {
          return response.items[0];
        } else {
          throw new Error('Artículo no encontrado');
        }
      }),
      catchError((error) => {
        console.error('Error al obtener el artículo:', error);
        return throwError('Error en la obtención del artículo.');
      })
    );
  }

  getLastPublishedPosts(count: number): Observable<any[]> {
    return from(this.client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt', // Order entries by publishDate in descending order
      limit: count, // Number of entries to retrieve
      include: 1
    }))
      .pipe(
        map((blogPosts: any) => blogPosts.items),
        catchError(error => {
          console.error('Error al obtener las últimas entradas:', error);
          return throwError('Error al obtener las últimas entradas.');
        })
      );
  }

  getAllCategories(): Observable<any[]>{
    return from(this.client.getEntries({
      content_type: 'blogCategory'
    })).pipe(
      map((blogCategories: any) => blogCategories.items),
      catchError(error => {
        console.error('Error al obtener las categorías:', error);
        return throwError('Error al obtener las categorías.');
      })
    );
  }

}
