import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsBuilderComponent } from './reactive-forms-builder.component';

import {} from 'jasmine'

describe('ReactiveFormsBuilderComponent', () => {
  let component: ReactiveFormsBuilderComponent;
  let fixture: ComponentFixture<ReactiveFormsBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveFormsBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
