import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core';
import { Hero } from 'src/app/models/hero';
@Component({
  selector: 'hero-unit',
  templateUrl: './hero-unit.component.html',
  styleUrls: ['./hero-unit.component.css']
})
export class HeroUnitComponent implements OnInit {
  @Input() heroData: Hero;
  @Output() delete = new EventEmitter<Hero>();
  @Output() updateEvent = new EventEmitter<Hero>();
  date = new Date();
  money: Number = 984218000;
  gender = 30;
  constructor() { }
  ngOnInit(): void {
  }
  updateHero(){
    this.updateEvent.emit(this.heroData);
  }
  removeHero(){
    let conf = confirm(`bạn có chắc chắn xóa hero:
                          ${this.heroData.name} hay không ?`);
    if(conf){
      this.delete.emit(this.heroData);
    }
  }
}
