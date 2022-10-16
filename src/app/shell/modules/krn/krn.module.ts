import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import {KrnicpComponent} from './krnicp/krnicp.component';
import {OperationsComponent} from './operations/operations.component';
import {AccountsComponent} from './accounts/accounts.component';
import {KrnRoutingModule} from './krn-routing.module';
import {ClientHeaderComponent} from '../../client-header/client-header.component';
import {CreateAccountComponent} from './accounts/create-account/create-account.component';

@NgModule({
  declarations: [KrnicpComponent, OperationsComponent, AccountsComponent, CreateAccountComponent, ClientHeaderComponent],
  imports: [KrnRoutingModule, SharedModule],
  exports: [
    ClientHeaderComponent
  ]
})
export class KrnModule {}
