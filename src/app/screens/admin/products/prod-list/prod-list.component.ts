
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {

  prod: any;
  // totalPage = null;
  // pages: Array<Number> = [];

  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: "",
    pagesize: 10,
    currentPage: 1
  }
  constructor(
    private router: Router,
    private bookService: BookService,

  ) { }

  ngOnInit(): void {
    this.getAllProd();
  }

  getAllProd() {
    this.bookService.getAllProd().subscribe(data => {
      this.prod = data;
    })
  }
  remove(id: any) {
    // console.log(id);
    this.bookService.findById(id).subscribe((cate) => {
      let cof = confirm("Bạn có chắc chắn xóa không?");
      if (cof) {
        this.bookService.remove(id).subscribe((data) => {
          // console.log(data);
          this.getAllProd();
          this.router.navigate(['/admin/san-pham'])
        });
      }
    });
  }
}
