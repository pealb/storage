import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageDb } from 'src/app/models/storage.model';

@Component({
  selector: 'app-storage-dialog',
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.scss']
})
export class StorageDialogComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl({ value: this.data?.id, disabled: true }, [Validators.required]),
    address: new FormControl(this.data?.address, [Validators.required, Validators.maxLength(50)]),
    width: new FormControl(this.data?.width, [Validators.required, Validators.min(1), Validators.max(5)]),
    length: new FormControl(this.data?.length, [Validators.required, Validators.min(1), Validators.max(5)])
  });

  constructor(private dialogRef: MatDialogRef<StorageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  save(): StorageDb {
    if(this.data) {
      let storage = this.formGroup.value;
      storage.id = this.data.id;

      return storage;
    }

    return this.formGroup.value;
  }

}
