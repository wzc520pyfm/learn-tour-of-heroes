import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes = HEROES;

  constructor() { }

  // 组件的生命周期函数, 可在此执行初始化操作
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
