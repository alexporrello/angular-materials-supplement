import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfbAnimatedSelectComponent } from './rfb-animated-select.component';

import {} from 'jasmine'

describe('RfbAnimatedSelectComponent', () => {
  let component: RfbAnimatedSelectComponent;
  let fixture: ComponentFixture<RfbAnimatedSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfbAnimatedSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfbAnimatedSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
