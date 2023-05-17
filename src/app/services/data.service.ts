import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Obra } from '../interfaces/projects';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private phpUrl = environment.Url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getWorks(): Observable<Obra[]>{
    return this.http.get<Obra[]>(this.phpUrl).pipe(
      tap(data => console.log('Data recibida:', data)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en getWorks:', error);
        return throwError(error);
      }),
    );
  }

  getWork(id: string): Observable<Obra> {
    return this.http.get<Obra>(`${this.phpUrl}/?id=${id}`).pipe(
      tap(data => console.log(`Data recibida para la obra ${id}:`, data)),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error en getWork(${id}):`, error);
        return throwError(error);
      })
    );
  }

}
