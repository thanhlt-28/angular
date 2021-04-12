import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  cates: Category[] = [];
  
  constructor(private cateService: CategoryService,
              private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.getCateList();
    
  }

  getCateList(){
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    })
  }

  remove(id: any){
    this.cateService.findById(id).subscribe(cate => {
      let ids = cate.books.map(item => item.id);
      this.bookService.removeMultiple(ids).subscribe(result => {
        this.cateService.remove(cate.id).subscribe(data => {
          console.log(data);
        })
      })
    })
  }

}
