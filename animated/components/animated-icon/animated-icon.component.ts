import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrls: ['./animated-icon.component.scss']
})
export class AnimatedIconComponent implements OnChanges {
  @Input() icon!: AnimatedIcon;
  @Input() animation!: Animation;

  @Input() size = 24;
  @Input() toggleState = false;
  @Input() state = true;
  @Input() primaryColor = AnimatedIconColor.PRIMARY;
  @Input() secondaryColor = AnimatedIconColor.ACCENT;

  @Output() click = new EventEmitter();

  @ViewChild('iconDiv') private _iconRef!: ElementRef;

  /** Used to access enum in template. */
  public iconType = AnimatedIcon;

  /** Used to access enum in template. */
  public animations = Animation;

  /** Used to access enum in template. */
  public currentState = AnimatedIconState;

  /** Value changes to trigger animation for animations that have a boolean state. */
  public animate = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state && this.state) {
      this.animate = this.state;
    }
  }

  public get className(): string {
    switch (this.animation) {
      case (Animation.JUMP_AND_SHAKE):
        return 'jump-and-shake ' + this.color;
      case (Animation.FALL):
        return 'fall ' + this.color;
      case (Animation.SPIN_45):
        return 'spin-45 ' + this.color;
      case (Animation.SPIN):
        return 'spin ' + this.color;
      default:
        return 'spin-45 ' + this.color;
    }
  }

  public get color(): string {
    return this.state ? this.primaryColor : this.secondaryColor;
  }

  public runAnimation(): void {
    switch (this.animation) {
      case (Animation.JUMP_AND_SHAKE):
        this._animate('jump-and-shake-animate');
        break;
      case (Animation.FALL):
        this._animate('fall-animate', false);
        break;
      case (Animation.SPIN_45):
        this._animate('spin-45-animate', false);
        break;
      case (Animation.SPIN):
        this._animate('spin-animate', false, 100);
    }
  }

  private _animate(className: string, stateChange = true, timeout = 50): void {
    this._iconRef.nativeElement.classList.add(className);
    setTimeout(() => {
      if (stateChange) {
        this.state = !this.state;
      }

      this.animate = !this.animate;
      this._iconRef.nativeElement.classList.remove(className);
    }, timeout);
  }
}

export enum AnimatedIcon {
  SUBSCRIBE, EXPAND_SORT, DOWNLOAD, LINK, DASHBOARD, ADD, PERSON, CLOSE
}

export enum Animation {
  JUMP_AND_SHAKE, FALL, SPIN_45, SPIN
}

export enum AnimatedIconState {
  EXPANDED, COLLAPSED, SUBSCRIBED, UNSUBSCRIBED
}

export class AnimatedIconColor {
  public static PRIMARY = 'primary';
  public static ACCENT = 'accent';
  public static WARN = 'warn';
}

export interface AnimatedIconEvent {
  /** Indicates the view state of the icon. */
  state: boolean;
}
