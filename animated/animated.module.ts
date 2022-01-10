import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

import { AnimatedIconComponent } from './components/animated-icon/animated-icon.component';
import { AnimatedPopupComponent } from './components/animated-popup/animated-popup.component';
import { AnimatedPopupTriggerDirective } from './components/animated-popup/animated-popup-trigger/animated-popup-trigger.directive';
import { AnimatedPopupWrapperComponent } from './components/animated-popup/animated-popup-wrapper/animated-popup-wrapper.component';
import { CollapsiblePanelActionsComponent } from './components/collapsible-panel/collapsible-panel-actions/collapsible-panel-actions.component';
import { CollapsiblePanelComponent } from './components/collapsible-panel/collapsible-panel.component';
import { ConditionalButtonRowComponent } from './components/conditional-button-row/conditional-button-row.component';
import { HideComponent } from './components/hide/hide.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
