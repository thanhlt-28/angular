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
  selector: 'app-prod-edit',
  templateUrl: './prod-edit.component.html',
  styleUrls: ['./prod-edit.component.css']
})
export class ProdEditComponent implements OnInit {


  sub = "Edit Form";
  downloadURL: Observable<string>;
  imageUrl: String = "https://banner2.cleanpng.com/20180805/cil/kisspng-porsche-cayenne-car-porsche-914-porsche-911-servizio-di-noleggio-porsche-in-europa-5b67243f55ffe1.7218574615334861433523.jpg"
  cates: Array<Category> = [];
  bookId: string;
  author: Array<Author> = [];
  editProd: FormGroup;


  prodEdit = new FormGroup({
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
    authorId: new FormControl(null),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
  });

  get title() { return this.prodEdit.get('title'); }
  get image() { return this.prodEdit.get('image'); }
  get desc() { return this.prodEdit.get('desc'); }
  get details() { return this.prodEdit.get('details'); }
  get categoryId() { return this.prodEdit.get('categoryId'); }
  get authorId() { return this.prodEdit.get('authorId'); }
  get price() { return this.prodEdit.get('price'); }

  constructor(
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private bookService: BookService,
    private cateService: CategoryService,
    private authService: AuthService
  ) {
    this.editProd = this.createForm();
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
    return this.prodEdit.controls;
  }



  async ngOnInit() {
    this.getCate();
    await this.activatedRoute.params.subscribe((params) => {
      this.bookId = params.id;
    });
    await this.bookService.findById(this.bookId).subscribe((book) => {
      this.editProd.setValue({
        id: book.id,
        title: book.title,
        image: book.image,
        desc: book.desc,
        details: book.details,
        price: book.price,
        categoryId: book.categoryId,
        authorId: book.authorId,
      });
      this.imageUrl = book.image;
    });
  }
  getCate() {
    this.cateService.getAll().subscribe(
      (data) => {
        this.author = data;
      }
    ),
      this.authService.getAll().subscribe(
        (data) => {
          this.author = data;
        })
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
          this.downloadURL.subscribe((url) => {
            this.imageUrl = url;
          });
        })
      )
      .subscribe((url) => {
        if (url) {
        }
      });
  }
  saveProd(event) {
    event.preventDefault();
    this.editProd.value.image = this.imageUrl;
    this.bookService.update(this.editProd.value).subscribe(data => {
      this.route.navigate(['/admin/san-pham']);
    })
  }

}



