import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from './message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  
  messageList: Message[] = [];
  message: Message = {};
  dateNow: Date = new Date();

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  sendMessage() {
    const userAgent = window.navigator.userAgent.split(')')[2];

    this.message ={
      ...this.message,
      sender: userAgent,
      date: this.dateNow
    };

    this.chatService.sendMessage(this.message)
  }

  getMessages() {
    this.chatService.getMessage().subscribe((message: Message)=> {
      this.messageList.push(message);
    })
  }
}
