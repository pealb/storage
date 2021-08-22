import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectDbService } from 'src/app/services/object-db.service';
import { Object } from '../../models/object.model';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ObjectDialogComponent } from '../dialogs/object-dialog/object-dialog.component';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit, OnDestroy {

  filterName: string;
  objects$: Observable<Object[]>;
  displayedColumns: string[] = ['name', 'length', 'createdAt'];
  displayedColumnsAdmin: string[] = ['name', 'length', 'createdAt', 'actions'];
  
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15];
  pageEvent: PageEvent;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  admin: boolean = false;
  adminSub: Subscription;

  constructor(private db: ObjectDbService, private auth: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.objects$ = this.db.list();
    this.adminSub = this.auth.admin.subscribe(admin => {
      this.admin = admin;
      if(admin) {
        this.displayedColumns = this.displayedColumnsAdmin;
      }
    });
  }

  onContextMenu(event: MouseEvent, object: Object) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'object': object };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuEdit(object: Object) {
    const dialogRef = this.dialog.open(ObjectDialogComponent, {
      width: 'fit-content',
      data: object
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

  onContextMenuDelete(object: Object) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: object
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
    const dialogRef = this.dialog.open(ObjectDialogComponent, {
      width: 'fit-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.db.new(result)
          .then(() => location.reload())
          .catch(error => console.log(error));
      }
    })
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
  }
}
