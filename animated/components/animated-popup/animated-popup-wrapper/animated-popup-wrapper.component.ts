import { AfterContentInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-popup-wrapper',
  templateUrl: './animated-popup-wrapper.component.html',
  styleUrls: ['./animated-popup-wrapper.component.scss']
})
export class AnimatedPopupWrapperComponent implements OnInit, OnChanges, AfterContentInit {
  @ViewChild('content') content?: ElementRef;

  constructor() { }

  ngAfterContentInit(): void {
    console.log(this.content?.nativeElement.offsetHeight);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content && this.content) {
      console.log(this.content.nativeElement.offsetHeight);
    }
  }

  ngOnInit() { }
}
