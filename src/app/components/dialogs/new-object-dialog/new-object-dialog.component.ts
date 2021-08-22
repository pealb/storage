import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-object-dialog',
  templateUrl: './new-object-dialog.component.html',
  styleUrls: ['./new-object-dialog.component.scss']
})
export class NewObjectDialogComponent implements OnInit {

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    length: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    width: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor(private dialogRef: MatDialogRef<NewObjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
