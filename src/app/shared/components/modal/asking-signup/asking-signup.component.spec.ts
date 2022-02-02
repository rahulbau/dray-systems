import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskingSignupComponent } from './asking-signup.component';

describe('AskingSignupComponent', () => {
  let component: AskingSignupComponent;
  let fixture: ComponentFixture<AskingSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskingSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskingSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
