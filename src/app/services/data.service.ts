import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icollection } from '../interfaces/projects';

const baseUrl = 'http://localhost:3000/collection';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getWorks(): Observable<Icollection[]> {
    return this.http.get<Icollection[]>(baseUrl);
  }

  getWork(url:string): Observable<Icollection>{
    return this.http.get<Icollection>(`${baseUrl}/${url}`);
  }
}
