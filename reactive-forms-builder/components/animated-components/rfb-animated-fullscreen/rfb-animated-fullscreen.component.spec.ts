import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfbAnimatedFullscreenComponent } from './rfb-animated-fullscreen.component';

import {} from 'jasmine'

describe('RfbAnimatedFullscreenComponent', () => {
  let component: RfbAnimatedFullscreenComponent;
  let fixture: ComponentFixture<RfbAnimatedFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfbAnimatedFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfbAnimatedFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
