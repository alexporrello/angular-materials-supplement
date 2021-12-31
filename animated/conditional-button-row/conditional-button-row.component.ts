import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

export class ConditionalButton {

  private _show: BehaviorSubject<boolean>;
  private _toDestory: Subscription;

  constructor(
    /** The button's text. */
    public text: string,

    /**
     * Standard css color, hex code, or our built-in style colors:
     * * `primary`
     * * `accent`
     * * `warn`.
     */
    public color: string,

    /** If the button is displayed in the UI. */
    show: boolean,

    /** The event that is emitted when the button is clicked. */
    public click: () => void,

    /** Managed to the UI for making the buttons vanish. */
    public showInUI?: boolean
  ) {
    this._show = new BehaviorSubject<boolean>(show);
    this.showInUI = show;

    this._show.subscribe(data => {
      if (data) {
        this.showInUI = true;
      } else {
        setTimeout(() => {
          this.showInUI = false;
        }, 250);
      }
    });
  }

  public set shouldShow(value: boolean) {
    this._show.next(value);
  }

  public get shouldShow(): boolean {
    return this._show.getValue();
  }

  public destory(): void {
    if (this._toDestory) {
      this._toDestory.unsubscribe();
    }
  }
}

@Component({
  selector: 'app-conditional-button-row',
  templateUrl: './conditional-button-row.component.html',
  styleUrls: ['./conditional-button-row.component.scss']
})
export class ConditionalButtonRowComponent implements OnDestroy {
  @Input() buttons: ConditionalButton[];

  constructor() { }

  ngOnDestroy(): void {
    this.buttons.forEach(button => button.destory());
  }
}
