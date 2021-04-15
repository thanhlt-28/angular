import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from "src/app/services/book.service";
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.css']
})
export class ProdFormComponent implements OnInit {

  sub = "Add Form";
  downloadURL: Observable<string>;
  imageUrl: String = "https://banner2.cleanpng.com/20180805/cil/kisspng-porsche-cayenne-car-porsche-914-porsche-911-servizio-di-noleggio-porsche-in-europa-5b67243f55ffe1.7218574615334861433523.jpg"
  cates: Array<Category> = [];
  author: Array<Author> = [];


  prodForm = new FormGroup({
    id: new FormControl(null),
    categoryId: new FormControl(null),
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
    authorId: new FormControl(null),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
  });

  get title() { return this.prodForm.get('title'); }
  get image() { return this.prodForm.get('image'); }
  get desc() { return this.prodForm.get('desc'); }
  get details() { return this.prodForm.get('details'); }
  get categoryId() { return this.prodForm.get('categoryId'); }
  get authorId() { return this.prodForm.get('authorId'); }
  get price() { return this.prodForm.get('price'); }

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private authService: AuthService,
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
            this.prodForm.setValue(data);
            this.getCates();
            this.imageUrl = this.prodForm.value.image;
          });
        }
      })
    })
  }
  createForm() {
    return new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      image: new FormControl(),
      desc: new FormControl(),
      details: new FormControl(),
      price: new FormControl(),
      categoryId: new FormControl(),
      authorId: new FormControl(),
    });
  }
  get f() {
    return this.prodForm.controls;
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
    }),
      this.authService.getAuthor().subscribe(
        (data) => {
          this.author = data;
        })
  }

  saveProd() {
    if (this.prodForm.valid) {
      this.prodForm.value.image = this.imageUrl;
      if (this.prodForm.value.id != null) {
        this.bookService.editProd(this.prodForm.value).subscribe(data => {
          this.route.navigate(['/admin/san-pham']);
        });
      } else {
        this.bookService.addProd(this.prodForm.value).subscribe(data => {
          this.route.navigate(['/admin/san-pham']);
        })
      }
    }
  }

}
