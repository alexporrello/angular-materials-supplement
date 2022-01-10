import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedPopupWrapperComponent } from './animated-popup-wrapper.component';

import {} from 'jasmine'

describe('AnimatedPopupWrapperComponent', () => {
  let component: AnimatedPopupWrapperComponent;
  let fixture: ComponentFixture<AnimatedPopupWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedPopupWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedPopupWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
