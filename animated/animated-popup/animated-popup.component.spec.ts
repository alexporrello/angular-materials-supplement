import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedPopupComponent } from './animated-popup.component';

import {} from 'jasmine'

describe('AnimatedPopupComponent', () => {
  let component: AnimatedPopupComponent;
  let fixture: ComponentFixture<AnimatedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
