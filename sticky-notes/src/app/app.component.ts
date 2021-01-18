import { Component, ElementRef, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  author: string;
  content: string;
}
@Component({
  selector: 'dialog-add-edit-notes',
  templateUrl: 'dialog-add-edit-notes.html',
})
export class DialogAddEditNotes {

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditNotes>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdRef: ChangeDetectorRef) { }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
  public onSaveClick(data): void {
    console.log(data);
    this.dialogRef.close(data);
    this.cdRef.detectChanges();
  }

}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  notes = [];
  author: string = '';
  content: string = '';
  constructor(
    public dialog: MatDialog,
    private el: ElementRef
  ) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0, content: '' }];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddEditNotes, {
      width: '850px',
      data: { author: this.author, content: this.content }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }
  updateAllNotes() {
    console.log(document.querySelectorAll('app-note'));
    let notes = document.querySelectorAll('app-note');

    notes.forEach((note, index) => {
      console.log(note.querySelector('.content').innerHTML)
      this.notes[note.id].content = note.querySelector('.content').innerHTML;
      this.notes[note.id].title = note.querySelector('.title').innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  addNote() {
    this.openDialog();
    // this.notes.push({ id: this.notes.length + 1, title: '', content: '' });
    // // sort the array
    // this.notes = this.notes.sort((a, b) => { return b.id - a.id });
    // localStorage.setItem('notes', JSON.stringify(this.notes));
  };

  saveNote(event) {
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const title = event.target.innerText;
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id': id,
      // 'title': title.
      'content': content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  updateNote(newValue) {
    this.notes.forEach((note, index) => {
      if (note.id == newValue.id) {
        this.notes[index].title = newValue.title;
        this.notes[index].content = newValue.content;
      }
    });
  }

  deleteNote(event) {
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    this.notes.forEach((note, index) => {
      if (note.id == id) {
        this.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }


}
