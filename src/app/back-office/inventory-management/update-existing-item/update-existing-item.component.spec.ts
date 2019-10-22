import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExistingItemComponent } from './update-existing-item.component';

describe('UpdateExistingItemComponent', () => {
  let component: UpdateExistingItemComponent;
  let fixture: ComponentFixture<UpdateExistingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExistingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExistingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
