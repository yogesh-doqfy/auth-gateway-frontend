import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ApiDetailsComponent } from './component/api-details/api-details.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { WorkflowDetialsComponent } from './component/workflow-detials/workflow-detials.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { ContentRecomWorkflowComponent } from './component/content-recom-workflow/content-recom-workflow.component';
import { HistoryComponent } from './component/history/history.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to '/dashboard' by default
  { path: 'dashboard', component: DashboardComponent, data: { activeOption: 'dashboard' } },
  // { path: 'dashboard', component: AdminDashboardComponent, data: { activeOption: 'admin-dashboard' } },
  { path: 'api-lib', component: DashboardComponent, data: { activeOption: 'api-lib' } },
  { path: 'usage', component: DashboardComponent, data: { activeOption: 'usage' } },
  { path: 'my-apis', component: DashboardComponent, data: { activeOption: 'my-apis' } },
  { path: 'pricing', component: DashboardComponent, data: { activeOption: 'pricing' } },
  { path: 'keys', component: DashboardComponent, data: { activeOption: 'keys' } },
  { path: 'help', component: DashboardComponent, data: { activeOption: 'help' } },
  { path: 'workflow', component: DashboardComponent, data: { activeOption: 'workflow' } },
  {path: 'admin-user',component: DashboardComponent, data: { activeOption: 'admin-user' }},
  { path: 'workflow-repository', component: DashboardComponent, data: { activeOption: 'workflow-repository' } },
  { path: 'history-api', component: DashboardComponent, data: { activeOption: 'history-api' } },
  { path: 'history-workflow', component: DashboardComponent, data: { activeOption: 'history-workflow' } },
  { path: 'transaction-history', component: DashboardComponent, data: { activeOption: 'transaction-history' } },
  // { path: 'my-apis', component: DashboardComponent, data: { activeOption: 'my-apis' } },

  {path: 'api/:id',component: ApiDetailsComponent},
  {path: 'workflow-detail/:id',component: WorkflowDetialsComponent},
  {path: 'workflow-run/:id',component: WorkflowDetialsComponent, data: { run: true }},
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'api', loadChildren: () => import('./component/component.module').then(m => m.ComponentModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
