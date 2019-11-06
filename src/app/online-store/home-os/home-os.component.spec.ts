import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOsComponent } from './home-os.component';

describe('HomeOsComponent', () => {
  let component: HomeOsComponent;
  let fixture: ComponentFixture<HomeOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
