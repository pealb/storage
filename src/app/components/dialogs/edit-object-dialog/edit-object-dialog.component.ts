import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-object-dialog',
  templateUrl: './edit-object-dialog.component.html',
  styleUrls: ['./edit-object-dialog.component.scss']
})
export class EditObjectDialogComponent implements OnInit {

  editForm: FormGroup = new FormGroup({
    id: new FormControl({value: this.data.id, disabled: true}, [Validators.required]),
    name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(50)]),
    length: new FormControl(this.data.length, [Validators.required, Validators.min(1), Validators.max(5)]),
    width: new FormControl(this.data.width, [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor(private dialogRef: MatDialogRef<EditObjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
