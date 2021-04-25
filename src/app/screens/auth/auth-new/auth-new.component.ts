import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { Author } from 'src/app/models/author';
import { BookService } from "src/app/services/book.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-new',
  templateUrl: './auth-new.component.html',
  styleUrls: ['./auth-new.component.css']
})
export class AuthNewComponent implements OnInit {

  authForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router) {
    this.authForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  get f() {
    return this.authForm.controls;
  }

  submitForm(event) {
    event.preventDefault();
    this.authService.storage(this.authForm.value).subscribe(data => {
      if (data.id != undefined) {
        this.router.navigate(['/admin/quoc-gia']);
      }
    })
  }

}