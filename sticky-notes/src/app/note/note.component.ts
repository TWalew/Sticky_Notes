import { Component, EventEmitter, Output, ElementRef, Input } from '@angular/core'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})

export class NoteComponent {

  @Input() public data: any;

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  onDismiss(event) {
    this.dismiss.emit(event);
  }

}
