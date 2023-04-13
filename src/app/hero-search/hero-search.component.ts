import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  // Subject是一个可观察对象的可触发的发布者(它本身也是一个Observable), 通过调用它的next(value)方法往Observable中推送一些值
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // 如果在用户每次输入一个字符后都发送一个请求，那么服务器将会收到大量的请求，而且还可能会因为网络延迟而导致请求顺序混乱
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // 在发出最终值之前，debounceTime将会等待，直到新增的元素不再出现
      distinctUntilChanged(), // distinctUntilChanged()会确保只在过滤条件变化时才发送请求
      switchMap((term: string) => this.heroService.searchHeroes(term)), // switchMap()会为每个从debounce和distinctUntilChanged中通过的搜索词调用搜索服务, 它会取消并丢弃以前的搜索可观察对象, 只保留最近的
    )
  }

}
