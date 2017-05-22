import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySignupComponent } from './my-signup.component';

describe('MySignupComponent', () => {
  let component: MySignupComponent;
  let fixture: ComponentFixture<MySignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
