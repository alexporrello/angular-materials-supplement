import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-icon',
  templateUrl: './animated-icon.component.html',
  styleUrls: ['./animated-icon.component.scss']
})
export class AnimatedIconComponent implements OnChanges {
  @Input() icon: AnimatedIcon;
  @Input() state = true;
  @Input() primaryColor = AnimatedIconColor.PRIMARY;
  @Input() secondaryColor = AnimatedIconColor.ACCENT;

  @Output() click = new EventEmitter();

  @ViewChild('subscribe') subscribe: ElementRef;
  @ViewChild('download') download: ElementRef;
  @ViewChild('link') link: ElementRef;

  /** Used to access enum in template. */
  public iconType = AnimatedIcon;

  /** Used to access enum in template. */
  public currentState = AnimatedIconState;

  /** Value changes to trigger animation for animations that have a boolean state. */
  public animate = false;

  constructor() { }

  get color(): string {
    return this.state ? this.primaryColor : this.secondaryColor;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state && this.state) {
      this.animate = this.state;
    }
  }

  public animateSubscribe() {
    this.subscribe.nativeElement.classList.add('jump-and-shake-animate');
    setTimeout(() => {
      this.state = !this.state;
      this.animate = !this.animate;
      this.subscribe.nativeElement.classList.remove('jump-and-shake-animate');
    }, 50);
  }

  public animateDownload() {
    this.download.nativeElement.classList.add('fall-animate');
    setTimeout(() => {
      this.animate = !this.animate;
      this.download.nativeElement.classList.remove('fall-animate');
    }, 50);
  }

  public animateSpin() {
    this.link.nativeElement.classList.add('spin-45-animate');
    setTimeout(() => {
      this.animate = !this.animate;
      this.link.nativeElement.classList.remove('spin-45-animate');
    }, 50);
  }
}

export enum AnimatedIcon {
  SUBSCRIBE, EXPAND_SORT, DOWNLOAD, LINK
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
