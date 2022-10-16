import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Pmd311Component} from './pmd311/pmd311.component';
import {PmdComponent} from './pmd.component';

const routes: Routes = [
  {
    path: '',
    component: PmdComponent,
    children: [
      {
        path: 'pmd311',
        component: Pmd311Component,
      },
      {
        path: '',
        redirectTo: 'pmd311',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmdRoutingModule {}
