import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  cates: Category[] = [];

  constructor(private cateService: CategoryService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCateList();

  }

  getCateList() {
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    })
  }

  remove(id: any) {
    // console.log(id);
    this.cateService.findById(id).subscribe((cate) => {
      let cof = confirm("Bạn có chắc chắn xóa không?");
      if (cof) {

        // let ids = cate.books.map((item) => item.id);
        // if (id.length != 0) {
        //   this.bookService.removeMultiple(id).subscribe((result) => {
        //     this.cateService.remove(cate.id).subscribe((data) => {
        //       // console.log(data);
        //       this.getCateList();
        //       this.router.navigate(['/admin/danh-muc'])
        //     });
        //   });
        // } else {
        this.cateService.remove(id).subscribe((data) => {
          // console.log(data);
          this.getCateList();
          this.router.navigate(['/admin/danh-muc'])
        });
        // }
      }
    });
  }

}
