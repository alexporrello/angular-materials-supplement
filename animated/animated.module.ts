import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

import { AnimatedIconComponent } from './animated-icon/animated-icon.component';
import { AnimatedPopupComponent } from './animated-popup/animated-popup.component';
import { AnimatedPopupTriggerDirective } from './animated-popup/animated-popup-trigger/animated-popup-trigger.directive';
import { AnimatedPopupWrapperComponent } from './animated-popup/animated-popup-wrapper/animated-popup-wrapper.component';
import { CollapsiblePanelActionsComponent } from './collapsible-panel/collapsible-panel-actions/collapsible-panel-actions.component';
import { CollapsiblePanelComponent } from './collapsible-panel/collapsible-panel.component';
import { ConditionalButtonRowComponent } from './conditional-button-row/conditional-button-row.component';
import { HideComponent } from './hide/hide.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    AnimatedIconComponent,
    AnimatedPopupComponent,
    AnimatedPopupTriggerDirective,
    AnimatedPopupWrapperComponent,
    CollapsiblePanelActionsComponent,
    CollapsiblePanelComponent,
    ConditionalButtonRowComponent,
    HideComponent,
    SpinnerComponent
  ],
  exports: [
    AnimatedIconComponent,
    AnimatedPopupComponent,
    AnimatedPopupTriggerDirective,
    CollapsiblePanelComponent,
    ConditionalButtonRowComponent,
    HideComponent,
    SpinnerComponent
  ]
})
export class AnimatedModule { }
