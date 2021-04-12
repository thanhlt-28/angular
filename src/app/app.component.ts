import { Component } from '@angular/core';
import { ORDER_DATA } from './mock-data/ORDER_DATA';
import { CategoryService } from './services/category.service';
import { MonsterService } from './services/monster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  cates = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.cates = data;
    })
  }
}

