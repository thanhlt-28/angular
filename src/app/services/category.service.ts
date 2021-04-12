import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.API_URL}?_embed=books`);
  }

  findById(id: any): Observable<Category>{
    let requestUrl = `${this.API_URL}/${id}?_embed=books`;
    return this.http.get<Category>(requestUrl);
  }

  remove(id: any): Observable<any>{
    let requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  store(object: Category): Observable<Category>{
    return this.http.post<Category>(this.API_URL, object);
  }

  update(object: Category): Observable<any>{
    let requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }

  uploadImage(fd){
    let requestUrl = "http://localhost:8000/upload-img";
    return this.http.post<any>(requestUrl, fd);
  }
}
