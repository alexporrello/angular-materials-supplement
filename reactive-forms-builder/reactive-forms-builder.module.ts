import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServicesModule } from '@services/services.module';
import { MaterialsModule } from '@materials/materials.module';
import { RfbAnimatedFullscreenComponent } from './components/animated-components/rfb-animated-fullscreen/rfb-animated-fullscreen.component';
import { RfbAnimatedSelectComponent } from './components/animated-components/rfb-animated-select/rfb-animated-select.component';
import { CalendarComponent } from './components/inputs/date-input/calendar/calendar.component';
import { DateInputComponent } from './components/inputs/date-input/date-input.component';
import { TimeInputComponent } from './components/inputs/time-input/time-input.component';
import { MakeTwoDigitsPipe, TimePickerComponent } from './components/inputs/time-input/time-picker/time-picker.component';
import { ReactiveFormsBuilderComponent } from './components/reactive-forms-builder/reactive-forms-builder.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    ServicesModule
  ],
  exports: [
    ReactiveFormsBuilderComponent,
    RfbAnimatedFullscreenComponent
  ],
  declarations: [
    ReactiveFormsBuilderComponent,
    DateInputComponent,
    TimeInputComponent,
    CalendarComponent,
    TimePickerComponent,
    MakeTwoDigitsPipe,
    RfbAnimatedFullscreenComponent,
    RfbAnimatedSelectComponent
  ]
})
export class ReactiveFormsBuilderModule { }
