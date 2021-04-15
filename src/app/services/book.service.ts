import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class BookService {
    private bookApi: string = "http://localhost:3000/books";
    store: any;

    constructor(private http: HttpClient) { }

    getAllProd(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.bookApi}?_embed=books`);
    }
    getAll(filter: any): Observable<any> {
        let requestUrl = this.bookApi + "?_expand=category&_expand=author";
        switch (filter.orderBy) {
            case "1":
                requestUrl += "&_sort=price&_order=asc";
                break;
            case "2":
                requestUrl += "&_sort=price&_order=desc";
                break;
            case "3":
                requestUrl += "&_sort=title&_order=asc";
                break;
            case "4":
                requestUrl += "&_sort=title&_order=desc";
                break;
            default:
                break;
        }
        if (filter.keyword.length > 0) {
            requestUrl += `&title_like=${filter.keyword}`;
        }

        return this.http.get<any>(requestUrl);
    }

    findById(id: string): Observable<any> {
        let requestUrl = `${this.bookApi}/${id}`;
        return this.http.get<any>(requestUrl);
    }

    addProd(obj: Product): Observable<any> {
        let url = this.bookApi;
        return this.http.post<any>(url, obj);
    }
    editProd(obj: Product): Observable<any> {
        let url = `${this.bookApi}/${obj.id}`;
        return this.http.put<any>(url, obj);
    }
    remove(id: any): Observable<any> {
        let requestUrl = `${this.bookApi}/${id}`;
        return this.http.delete<any>(requestUrl);

        // return forkJoin(requestUrls);
    }
    update(object: Product): Observable<Product> {
        object.categoryId = parseInt(object.categoryId.toString());
        object.authorId = parseInt(object.authorId.toString());
        let requestUrl = `${this.bookApi}/${object.id}`;
        return this.http.put<Product>(requestUrl, object);
    }
    storage(object: Product): Observable<Product> {

        object.categoryId = parseInt(object.categoryId.toString());
        object.authorId = parseInt(object.authorId.toString());
        return this.http.post<Product>(this.bookApi, object);
    }
}
