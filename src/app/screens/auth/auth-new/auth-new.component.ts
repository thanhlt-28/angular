import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { BookService } from "src/app/services/book.service";
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-new',
  templateUrl: './auth-new.component.html',
  styleUrls: ['./auth-new.component.css']
})
export class AuthNewComponent implements OnInit {

  listAuthor: Author[];
  imgUrl = "https://vinatex.com.vn/wp-content/themes/vinatex/assets/images/default-thumbnail.png";
  uploadForm: FormGroup;
  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    private router: Router,
    private bookService: BookService,
    private cateService: CategoryService,
    private authorService: AuthService

  ) {
    this.uploadForm = new FormGroup({
      title: new FormControl(''),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAuth();
  }
  getAuth() {

    this.authorService.getAll().subscribe(
      (data) => {
        this.listAuthor = data;
      });
  }
  upload(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Uploads/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.imgUrl = url;
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
  submitForm(event) {
    event.preventDefault();
    this.uploadForm.value.image = this.imgUrl;
    this.bookService.storage(this.uploadForm.value)
      .subscribe(data => {
        if (data.id != undefined) {
          this.router.navigate(['/admin/quoc-gia']);
        }
      })

  }

}