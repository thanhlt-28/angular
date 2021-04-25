import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-edit',
  templateUrl: './auth-edit.component.html',
  styleUrls: ['./auth-edit.component.css']
})
export class AuthEditComponent implements OnInit {

  authId: string;
  authEdit: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authEdit = this.createForm();
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.authId = params.id
    });
    await this.authService.findById(this.authId).subscribe(auth => {
      this.authEdit.setValue({
        id: auth.id,
        name: auth.name
      })
    });
  }

  createForm() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get f() {
    return this.authEdit.controls;
  }

  submitForm(event) {
    event.preventDefault();
    this.authService.update(this.authEdit.value).subscribe(data => {
      this.router.navigate(['/admin/quoc-gia']);
    })
  }

}