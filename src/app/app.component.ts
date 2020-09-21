import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogComponent } from './notify-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dialogService: MatDialog) {}

  ngOnInit(): void {
    this.dialogService.open(NotifyDialogComponent, {
      width: '600px',
      disableClose: true,
    });
  }
}
