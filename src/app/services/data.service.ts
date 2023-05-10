import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Obra } from '../interfaces/projects';

const phpUrl = 'http://localhost/geabackend/obras.php';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getWorks(): Observable<Obra[]>{
    return this.http.get<Obra[]>(phpUrl);
  }

  getWork(id: string): Observable<Obra> {
    return this.http.get<Obra>(`${phpUrl}/?id=${id}`);
  }


}
