import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hide',
  templateUrl: './hide.component.html',
  styleUrls: ['./hide.component.scss']
})
export class HideComponent {
  @Input() show = false;
  @Input() textColor = 'black';

  constructor() { }
}
