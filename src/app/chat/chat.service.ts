import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket
  ) { }

  sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('message', (message: string) => {
        observer.next(message)
      })
    })
  }
}
