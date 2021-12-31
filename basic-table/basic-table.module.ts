import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServicesModule } from '@services/services.module';
import { ComponentsModule } from 'app/components/components.module';
import { AnimatedModule } from '@animated/animated.module';
import { environment } from 'environments/environment';
import { MaterialsModule } from '@materials/materials.module';
import { BasicTableComponent } from './basic-table.component';
import { BasicTableCountdownComponent } from './components/basic-table-countdown/basic-table-countdown.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BasicTableFormatService } from './services/basic-table-format.service';
import { TransformService } from './services/transform.service';


if (environment.production) {
  enableProdMode();
}

@NgModule({
  imports: [
    BrowserModule,
    ComponentsModule,
    MaterialsModule,
    AnimatedModule,
    ServicesModule
  ],
  providers: [
    BasicTableFormatService,
    TransformService
  ],
  declarations: [
    BasicTableComponent,
    BasicTableCountdownComponent,
    SearchBarComponent
  ],
  exports: [
    BasicTableComponent,
    BasicTableCountdownComponent
  ]
})
export class BasicTableModule {}
