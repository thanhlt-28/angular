import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Author } from 'src/app/models/author';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-list',
  templateUrl: './auth-list.component.html',
  styleUrls: ['./auth-list.component.css']
})
export class AuthListComponent implements OnInit {

  author: Author[] = [];

  constructor(private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCateList();

  }

  getCateList() {
    this.authService.getAll().subscribe(data => {
      this.author = data;
    })
  }

  remove(id: any) {
    // console.log(id);
    this.authService.findById(id).subscribe((cate) => {
      let cof = confirm("Bạn có chắc chắn xóa tác giả này?");
      if (cof) {
        this.authService.remove(id).subscribe((data) => {
          // console.log(data);
          this.getCateList();
          this.router.navigate(['/admin/quoc-gia'])
        });
      }
    });
  }
}

