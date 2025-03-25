import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ComponentParentComponent } from './component-parent/component-parent.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'component-parent',
    component: ComponentParentComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: ':id',
    component: ApiDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { 
  
}