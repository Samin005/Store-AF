import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOSComponent } from './header-os.component';

describe('HeaderOSComponent', () => {
  let component: HeaderOSComponent;
  let fixture: ComponentFixture<HeaderOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
