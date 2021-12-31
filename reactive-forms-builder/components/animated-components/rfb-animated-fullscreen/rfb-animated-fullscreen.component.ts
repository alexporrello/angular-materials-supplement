import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rfb-animated-fullscreen',
  templateUrl: './rfb-animated-fullscreen.component.html',
  styleUrls: ['./rfb-animated-fullscreen.component.scss']
})
export class RfbAnimatedFullscreenComponent implements OnChanges {
  @Input() show = false;
  @Input() actionIcon = 'add';
  @Input() actionIconColor = 'accent';
  @Input() actionIconTooltip = 'Save changes';

  @Output() close = new EventEmitter();
  @Output() action = new EventEmitter();

  @ViewChild('content') content: ElementRef;
  @ViewChild('background') background: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show !== undefined && changes) {
      this._showHide();
    }
  }

  private _showHide() {
    if (this.show) {
      this.background.nativeElement.classList.add('background-visible');
      this.content.nativeElement.classList.add('editing-move');
    } else {
      this.background.nativeElement.classList.remove('background-visible');
      this.content.nativeElement.classList.remove('editing-move');
    }
  }
}
