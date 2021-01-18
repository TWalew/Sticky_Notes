import { Component, ElementRef, ChangeDetectionStrategy, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  author: string;
  content: string;
  file: any;
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


  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  ngOnInit(): void {
    this.fileAttr = this.data.file;
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
  public onSaveClick(data): void {
    this.data.file = this.fileAttr;
    this.dialogRef.close(data);
    this.cdRef.detectChanges();
  }


  public uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
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
  file: File;
  constructor(
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.getAllNotes();
  }

  public getAllNotes(): void {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0, content: '' }];
  }

  public addNote(): void {
    const dialogRef = this.dialog.open(DialogAddEditNotes, {
      width: '850px',
      data: { author: this.author, content: this.content, file: this.file }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.notes.push({ id: this.notes.length + 1, date: new Date, author: result.author, content: result.content, file: result.file });
        this.notes = this.notes.sort((a, b) => { return b.id - a.id });
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.getAllNotes();
        this.cdRef.detectChanges();
      });
  };

  public updateNote(note): void {
    const dialogRef = this.dialog.open(DialogAddEditNotes, {
      width: '850px',
      data: { author: note.author, content: note.content, file: note.file }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.notes.forEach((note, index) => {
          if (note.id == result.id) {
            this.notes[index].author = result.author;
            this.notes[index].content = result.content;
            this.notes[index].file = result.file;
          }
          localStorage.setItem('notes', JSON.stringify(this.notes));
          this.cdRef.detectChanges();
        });
      });
  }

  public deleteNote(event): void {
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    this.notes.forEach(
      (note, index) => {
        if (note.id == id) {
          this.notes.splice(index, 1);
          localStorage.setItem('notes', JSON.stringify(this.notes));
          this.cdRef.detectChanges();
          return;
        }
      });
  }
}
