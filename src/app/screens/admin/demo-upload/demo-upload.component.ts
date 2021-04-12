import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-demo-upload',
  templateUrl: './demo-upload.component.html',
  styleUrls: ['./demo-upload.component.css']
})
export class DemoUploadComponent implements OnInit {
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage,
    private cateService: CategoryService) { }


  ngOnInit(): void {
  }

  uploadFile(event) {
    event.preventDefault();

  }
  upload2Laravel(event) {
    let fd = new FormData();
    fd.append('image', event.target.files[0]);
    this.cateService.uploadImage(fd).subscribe(data => {
      console.log(data);
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
            console.log(url)
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
