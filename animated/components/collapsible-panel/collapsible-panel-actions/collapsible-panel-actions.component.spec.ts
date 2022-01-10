import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelActionsComponent } from './collapsible-panel-actions.component';

import {} from 'jasmine'

describe('CollapsiblePanelActionsComponent', () => {
  let component: CollapsiblePanelActionsComponent;
  let fixture: ComponentFixture<CollapsiblePanelActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsiblePanelActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblePanelActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
