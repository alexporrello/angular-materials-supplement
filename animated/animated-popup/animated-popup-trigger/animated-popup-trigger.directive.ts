import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AnimatedPopupComponent } from '../animated-popup.component';

@Directive({
  selector: '[animPopupTrigger]',
  host: {
    '(click)': 'handleClick($event)',
  },
})
export class AnimatedPopupTriggerDirective {
  @Output() close = new EventEmitter<string>();

  public _height = 0;

  constructor(
    private _host: ElementRef
  ) {
    console.log(this._host.nativeElement.offsetLeft);
  }

  ngAfterContentInit(): void {
    // throw new Error('Method not implemented.');
  }

  /** Handles click events on the trigger. */
  public handleClick(event: MouseEvent): void {
    if (this.popup.show) {
      this.popup.handleClose();
      this.close.emit('fart');
    } else {
      this.popup.show = true;
    }
  }

  @Input('animPopupTrigger')
  get popup(): AnimatedPopupComponent | undefined {
    return this._popup;
  }
  set popup(popup: AnimatedPopupComponent | undefined) {
    if (popup === this._popup) {
      return;
    }

    this._popup = popup;
    this.popup.height = this._host.nativeElement.offsetHeight;
    this._popup.x = this._host.nativeElement.offsetLeft;
    this._popup.y = this._host.nativeElement.offsetTop + this.popup.height;
  }
  private _popup: AnimatedPopupComponent;

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
