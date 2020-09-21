import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  template: `
    <h1>Datenprobleme am 22.09.2020</h1>
    <h4>Eine unserer Datenquellen hat ein für uns entscheidendes Datenset gelöscht.</h4>
    <p>
      Bis keine alternative Datenquelle gefunden wurde kann die Richtigkeit mancher
      Kriminalstatistiken der Landkreise nicht garantiert werden.
    </p>
    <p class="mat-body-strong">Danke für Ihr Verständnis 💗</p>
    <footer>
      <button (click)="onClose()" mat-raised-button color="primary">Okay</button>
    </footer>
  `,
  styles: [
    `
      footer {
        display: grid;
        justify-items: end;
      }

      ,
      *:focus {
        outline: 0;
      }
    `,
  ],
})
export class NotifyDialogComponent {
  constructor(private dialogRef: MatDialogRef<NotifyDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
