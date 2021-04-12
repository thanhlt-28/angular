import { Component, OnInit } from '@angular/core';
import {Hero} from '../../models/hero';
import {HEROES} from '../../mock-data/HEROES';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Array<Hero> = HEROES;
  updateObject: Hero = {
    id: 0,
    name: "",
    image: "",
    skills: []
  };
  constructor() { }

  ngOnInit(): void {
  }

  updateHero(hero: Hero){
    this.updateObject = { ...hero};
  }

  parentRemove(removeObject: Hero){
    this.heroes = this.heroes.filter(item => item.id != removeObject.id);
  }

  saveFormSubmit(data: Hero){
    let existed = this.heroes.findIndex(el => el.id == data.id);
    if(existed == -1){
      this.heroes.push(data);
    }else{
      this.heroes[existed] = {...data};
    }
    this.updateObject = {
      id: 0,
      name: "",
      image: "",
      skills: []
    };
  }
}
