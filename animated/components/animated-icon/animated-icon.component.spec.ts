import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedIconComponent } from './animated-icon.component';

import {} from 'jasmine'

describe('AnimatedIconComponent', () => {
  let component: AnimatedIconComponent;
  let fixture: ComponentFixture<AnimatedIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
