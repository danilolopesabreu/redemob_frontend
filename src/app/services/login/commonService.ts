import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CommonService {
  aClickedEvent = new EventEmitter<string>();

  emitEvent(msg: string) {
    this.aClickedEvent.emit(msg);
  }
}