import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then((m) => m.BpmModule),
        data: { preload: true },
      },
      {
        path: 'krn',
        loadChildren: () => import('./modules/krn/krn.module').then((m) => m.KrnModule),
        data: { preload: true },
      },
      {
        path: 'pmd',
        loadChildren: () => import('./modules/pmd/pmd.module').then((m) => m.PmdModule),
        data: { preload: true },
      },
      {
        path: '',
        redirectTo: 'bpm',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
