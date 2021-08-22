import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjectDialogComponent } from './edit-object-dialog.component';

describe('EditObjectDialogComponent', () => {
  let component: EditObjectDialogComponent;
  let fixture: ComponentFixture<EditObjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditObjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
