import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  // 组件的生命周期函数, 可在此执行初始化操作
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // 异步获取数据
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // subscribe()即订阅服务, Observable被订阅前不会做任何事
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
