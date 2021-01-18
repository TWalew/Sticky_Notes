import { Component, EventEmitter, Output, ElementRef } from '@angular/core'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})

export class NoteComponent {

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();

  constructor(private el: ElementRef) { }

  onDismiss(event) {
    this.dismiss.emit(event);
  }

  onFocusOut(event) {
    this.focusout.emit(event)
  }

}
