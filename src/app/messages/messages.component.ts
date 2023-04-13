import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent {

  // 只有public修饰符的属性才能在模板中使用
  constructor(public messageService: MessageService) { }

}
