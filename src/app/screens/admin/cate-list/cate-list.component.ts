import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MonsterService } from 'src/app/services/monster.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  cates: Category[] = [];

  constructor(private cateService: CategoryService,
    private monsterService: MonsterService
  ) { }

  ngOnInit(): void {
    this.getCateList();

  }

  getCateList() {
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    })
  }

  remove(id: any) {
    this.cateService.findById(id).subscribe(cate => {
      let ids = cate.monster.map(item => item.id);
      this.monsterService.removeMultiple(ids).subscribe(result => {
        this.cateService.remove(cate.id).subscribe(data => {
          return this.cates;
        })
      })
    })
  }

}
