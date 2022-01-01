import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AnimatedIcon } from '../animated-icon/animated-icon.component';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.scss']
})
export class CollapsiblePanelComponent implements OnInit, OnChanges {
  @Input() title?: string;
  @Input() open = false;
  @Input() animationDuration = .5;

  @ViewChild('content') content?: ElementRef;

  public icon = AnimatedIcon.EXPAND_SORT;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.content);
  }

  ngOnInit() {
    console.log(this.content);
  }
}
