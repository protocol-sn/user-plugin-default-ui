import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupManagementRowComponent } from './user-group-management-row.component';

describe('UserGroupManagementRowComponent', () => {
  let component: UserGroupManagementRowComponent;
  let fixture: ComponentFixture<UserGroupManagementRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupManagementRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupManagementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
