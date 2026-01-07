import { Component, input } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageItem } from '../message-item/message-item';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItem],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages = input<Message[]>([]);
}
