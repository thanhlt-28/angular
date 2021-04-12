import { Component, OnInit } from '@angular/core';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
import { MonsterService } from 'src/app/services/monster.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private monsterService: MonsterService) { }
  monster: any;
  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: ""
  }

  ngOnInit(): void {
    this.search();
  }
  search() {
    this.monsterService.getAll(this.filterObject).subscribe(data => {
      this.monster = data;
    })
  }

}
