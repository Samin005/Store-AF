import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSignInComponent } from './show-sign-in.component';

describe('ShowSignInComponent', () => {
  let component: ShowSignInComponent;
  let fixture: ComponentFixture<ShowSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
