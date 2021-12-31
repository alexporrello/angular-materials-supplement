import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { AnimatedIconComponent } from './animated-icon/animated-icon.component';
import { CollapsiblePanelComponent } from './collapsible-panel/collapsible-panel.component';
import { ConditionalButtonRowComponent } from './conditional-button-row/conditional-button-row.component';
import { HideComponent } from './hide/hide.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CollapsiblePanelActionsComponent } from './collapsible-panel/collapsible-panel-actions/collapsible-panel-actions.component';
import { AnimatedPopupComponent } from './animated-popup/animated-popup.component';
import { AnimatedPopupWrapperComponent } from './animated-popup/animated-popup-wrapper/animated-popup-wrapper.component';
import { AnimatedPopupTriggerDirective } from './animated-popup/animated-popup-trigger/animated-popup-trigger.directive';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    AnimatedIconComponent,
    CollapsiblePanelComponent,
    CollapsiblePanelActionsComponent,
    ConditionalButtonRowComponent,
    HideComponent,
    SpinnerComponent,
    AnimatedPopupComponent,
    AnimatedPopupWrapperComponent,
    AnimatedPopupTriggerDirective
  ],
  exports: [
    AnimatedIconComponent,
    CollapsiblePanelComponent,
    ConditionalButtonRowComponent,
    HideComponent,
    SpinnerComponent,
    AnimatedPopupComponent,
    AnimatedPopupTriggerDirective
  ]
})
export class AnimatedModule { }
