import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-prod-edit',
  templateUrl: './prod-edit.component.html',
  styleUrls: ['./prod-edit.component.css']
})
export class ProdEditComponent implements OnInit {

  sub = "Add Form";
  downloadURL: Observable<string>;
  imageUrl: String = ""
  cates: Array<Category> = [];


  prodNew = new FormGroup({
    id: new FormControl(null),
    categoryId: new FormControl(null),
    // category: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    image: new FormControl(''),
    desc: new FormControl('', [
      Validators.required,
    ]),
    details: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl(null, [
      Validators.required,
    ]),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
  });

  get title() { return this.prodNew.get('title'); }
  get image() { return this.prodNew.get('image'); }
  get desc() { return this.prodNew.get('desc'); }
  get details() { return this.prodNew.get('details'); }
  get categoryId() { return this.prodNew.get('categoryId'); }
  get price() { return this.prodNew.get('price'); }

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }


  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.cates = data;

      this.getCates();
      this.activeRoute.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id) {
          this.sub = "Edit Form";
          this.bookService.findById(id).subscribe(data => {
            this.prodNew.setValue(data);
            this.getCates();
            this.imageUrl = this.prodNew.value.image;
          });
        }
      })
    })
  }

  onFileSelected(event) {
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
            this.imageUrl = url;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }

  getCates() {
    let num: [1, 100];
    this.categoryService.getAll().subscribe(data => {
      this.cates = data;
    })
  }

  saveProd() {
    if (this.prodNew.valid) {
      this.prodNew.value.image = this.imageUrl;
      if (this.prodNew.value.id != null) {
        this.bookService.editProd(this.prodNew.value).subscribe(data => {
          this.route.navigate(['/admin/san-pham']);
        });
      } else {
        this.bookService.addProd(this.prodNew.value).subscribe(data => {
          this.route.navigate(['/admin/san-pham']);
        })
      }
    }
  }

}