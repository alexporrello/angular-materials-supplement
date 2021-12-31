import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTableCountdownComponent } from './basic-table-countdown.component';

import {} from 'jasmine'

describe('BasicTableCountdownComponent', () => {
  let component: BasicTableCountdownComponent;
  let fixture: ComponentFixture<BasicTableCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTableCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
