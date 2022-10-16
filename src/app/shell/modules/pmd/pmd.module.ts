import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import {Pmd311Component} from './pmd311/pmd311.component';
import {PmdRoutingModule} from './pmd-routing.module';
import {PmdComponent} from './pmd.component';

@NgModule({
  declarations: [PmdComponent, Pmd311Component],
  imports: [PmdRoutingModule, SharedModule],
})
export class PmdModule {}
