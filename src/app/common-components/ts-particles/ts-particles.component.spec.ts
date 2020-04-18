import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsParticlesComponent } from './ts-particles.component';

describe('TsParticlesComponent', () => {
  let component: TsParticlesComponent;
  let fixture: ComponentFixture<TsParticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsParticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
