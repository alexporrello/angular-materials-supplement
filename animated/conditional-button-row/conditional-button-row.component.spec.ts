import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalButtonRowComponent } from './conditional-button-row.component';

import {} from 'jasmine'

describe('ConditionalButtonRowComponent', () => {
  let component: ConditionalButtonRowComponent;
  let fixture: ComponentFixture<ConditionalButtonRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalButtonRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalButtonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
