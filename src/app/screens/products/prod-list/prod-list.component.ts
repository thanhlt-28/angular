
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  prod: Array<any> = [];
  totalPage = null;
  pages: Array<Number> = [];

  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: "",
    pagesize: 10,
    currentPage: 1
  }
  constructor(
    private route: Router,
    private bookService: BookService,

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.bookService.getAll(this.filterObject).subscribe(res => {

      this.prod = res.data;
      this.totalPage = res.last_page;
      if (this.pages.length == 0) {
        for (let i = 1; i <= this.totalPage; i++) this.pages.push(i)
      }
    })
  }
  remove(id) {
    let conf = confirm("Bạn chắc chắn xóa");
    if (conf) {
      this.bookService.removeMultiple(id).subscribe(data => {
        this.getAllProducts();
        this.route.navigate(['/admin/product-list']);
      })
    }
  }
}
