import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = "http://localhost:3000/authors";
  store: Array<Author>[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.API_URL}?_embed=authors`);
  }
  getAuthor(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.API_URL}?_embed=authors`);
  }
  findById(id: any): Observable<Author> {
    let requestUrl = `${this.API_URL}/${id}?_embed=authors`;
    return this.http.get<Author>(requestUrl);
  }

  remove(id: any): Observable<any> {
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  storage(object: Author): Observable<Author> {
    return this.http.post<Author>(this.API_URL, object);
  }

  update(object: Author): Observable<any> {
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }

  uploadImage(fd) {
    let requestUrl = "http://localhost:8000/upload-img";
    return this.http.post<any>(requestUrl, fd);
  }
}
