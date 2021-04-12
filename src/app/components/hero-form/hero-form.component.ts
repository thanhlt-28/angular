import { Component, OnInit, 
        Input, Output, EventEmitter } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  @Input() formObject: Hero;
  
  @Output() submitForm = new EventEmitter<Hero>();
  lstSkills: Array<Skill> = [
    {
      id: 1,
      name: "PHP"
    },
    {
      id: 2,
      name: "javascript"
    },
    {
      id: 3,
      name: "HTML"
    },
    {
      id: 4,
      name: "CSS"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  submitHeroForm(event){
    event.preventDefault();
    this.submitForm.emit(this.formObject);
  }

  addSkill2FormObject(item: Skill, event){
    
    if(event.target.checked == true){
      let index = this.formObject.skills.findIndex(e => e.id == item.id);  
      if(index == -1){
        this.formObject.skills.push(item);
      }
    }else{
      this.formObject.skills = this.formObject.skills.filter(e => e.id != item.id);
    }
  }

  setCheckedCheckbox(item: Skill){
    if(this.formObject.skills == undefined){
      this.formObject.skills = [];
    }
    let index = this.formObject.skills.findIndex(el => el.id == item.id );
    return index != -1;
  }

  resetForm(): Hero{
    return {
      id: 0,
      name: "",
      image: "",
      skills: []
    };
  }
}
