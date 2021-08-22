import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { FilterByAddressPipe } from './pipes/filter-by-address.pipe';
import { LimitPipe } from './pipes/limit.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageComponent } from './components/storage/storage.component';
import { ObjectComponent } from './components/object/object.component'
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditObjectDialogComponent } from './components/dialogs/edit-object-dialog/edit-object-dialog.component';
import { NewObjectDialogComponent } from './components/dialogs/new-object-dialog/new-object-dialog.component';
import { StorageDialogComponent } from './components/dialogs/storage-dialog/storage-dialog.component';
import { ObjectDialogComponent } from './components/dialogs/object-dialog/object-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    StorageComponent,
    ObjectComponent,
    FilterByNamePipe,
    LimitPipe,
    ConfirmationDialogComponent,
    EditObjectDialogComponent,
    NewObjectDialogComponent,
    FilterByAddressPipe,
    StorageDialogComponent,
    ObjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, ObjectDialogComponent, StorageDialogComponent]
})
export class AppModule { }
