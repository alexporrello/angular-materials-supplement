import { Component } from '@angular/core';

@Component({
  selector: 'app-animated-popup',
  templateUrl: './animated-popup.component.html',
  styleUrls: ['./animated-popup.component.scss']
})
export class AnimatedPopupComponent {
  public show = false;

  constructor() { }

  public x: number;
  public y: number;

  private _height: number;

  public get height(): number {
    return this._height || 0;
  }

  public set height(height: number) {
    this._height = height;
  }

  handleClose() {
    this.show = false;
  }
}
