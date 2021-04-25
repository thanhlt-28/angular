
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
import { AuthService } from 'src/app/services/auth.service';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  prod: Array<Product> = [];
  author: Array<Author> = [];
  cates: Category[] = [];


  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: "",

  }
  constructor(
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllProd();
  }

  getAllProd() {
    this.bookService.getAllProd().subscribe(data => {
      this.prod = data;
    }),
      this.authService.getAll().subscribe(data => {
        this.author = data;
      })
  }
  remove(id: any) {
    this.bookService.findById(id).subscribe((cate) => {
      let cof = confirm("Bạn có chắc chắn xóa không?");
      if (cof) {
        this.bookService.remove(id).subscribe((data) => {
          this.getAllProd();
          this.router.navigate(['/admin/san-pham'])
        });
      }
    });
  }
}
