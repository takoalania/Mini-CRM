import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KrnicpComponent} from './krnicp/krnicp.component';
import {OperationsComponent} from './operations/operations.component';
import {AccountsComponent} from './accounts/accounts.component';
import {CreateAccountComponent} from './accounts/create-account/create-account.component';

const routes: Routes = [
  {
    path: '',
    component: KrnicpComponent,
    children: [
      {
        path: 'krnicp',
        component: KrnicpComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
      {
        path: 'accounts/create',
        component: CreateAccountComponent,
      },
      {
        path: 'operations',
        component: OperationsComponent,
      },
      {
        path: '',
        redirectTo: 'krnicp',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KrnRoutingModule {}
