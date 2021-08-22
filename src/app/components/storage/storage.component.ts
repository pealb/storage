import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { StorageDb } from 'src/app/models/storage.model';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectDbService } from 'src/app/services/object-db.service';
import { StorageDbService } from 'src/app/services/storage-db.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { StorageDialogComponent } from '../dialogs/storage-dialog/storage-dialog.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit, OnDestroy {

  filterAddress: string;
  storages$: Observable<StorageDb[]>;
  displayedColumns: string[] = ['id', 'address', 'length', 'width'];
  displayedColumnsAdmin: string[] = ['id', 'address', 'length', 'width', 'actions'];
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15];
  pageEvent: PageEvent;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  admin: boolean = false;
  adminSub: Subscription;

  storageParams: { width: number, length: number };
  objectParams: { width: number, length: number };

  constructor(private auth: AuthService, private db: StorageDbService, private objectDb: ObjectDbService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.storages$ = this.db.list();

    this.adminSub = this.auth.admin.subscribe(admin => {
      this.admin = admin;
      if(admin) {
        console.log(admin)
        this.displayedColumns = this.displayedColumnsAdmin;
      }
    });

    this.db.getParams()
      .then((params) => this.storageParams = params)
      .catch(error => console.log(error));

    this.objectDb.getParams()
      .then((params) => this.objectParams = params)
      .catch(error => console.log(error));
  }

  onContextMenu(event: MouseEvent, storage: StorageDb) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'storage': storage };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuEdit(storage: StorageDb) {
    const dialogRef = this.dialog.open(StorageDialogComponent, {
      width: 'fit-content',
      data: storage
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.db.update(result)
        .then(() => {
          let snackBarRef = this.snackBar.open('Sikeres mentés', 'OK', { duration: 2000 });
          snackBarRef.afterDismissed().subscribe(() => location.reload());
        })
        .catch((error) => console.log(error));
      }
    });
  }

  onContextMenuDelete(storage: StorageDb) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: storage
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.db.delete(result.id)
          .then(() => {
            let snackBarRef = this.snackBar.open('Sikeres törlés', 'OK', { duration: 2000 });
            snackBarRef.afterDismissed().subscribe(() => location.reload());
          })
          .catch(error => console.log(error));
      }
    })
  }

  new() {
    const dialogRef = this.dialog.open(StorageDialogComponent, {
      width: 'fit-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.db.new(result)
          .then(() => location.reload())
          .catch(error => console.log(error));
        console.log(result);  
      }
    })
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
  }
}
