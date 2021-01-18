import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, DialogAddEditNotes } from './app.component';
import { NoteComponent } from './note/note.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialFileInputModule
  ],
  declarations: [
    AppComponent,
    NoteComponent,
    DialogAddEditNotes
  ],
  entryComponents: [DialogAddEditNotes],
  bootstrap: [AppComponent]
})
export class AppModule { }
