import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired-dialog',
  templateUrl: './session-expired-dialog.coponent.html',
  styleUrls: ['./session-expired-dialog.component.css']
})
export class SessionExpiredDialogComponent implements OnInit {

  sessionForm: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<SessionExpiredDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.sessionForm = this.fb.group({
      message: ['Your session has expired. Please login again.']
    });
  }

  login(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}