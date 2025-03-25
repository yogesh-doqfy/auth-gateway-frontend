import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';

import { ApiCardComponent } from './api-card/api-card.component';
import { ComponentParentComponent } from './component-parent/component-parent.component';
import { ContentApiLibComponent } from './content-api-lib/content-api-lib.component';
import { ContentHelpComponent } from './content-help/content-help.component';
import { ContentMyApisComponent } from './content-my-apis/content-my-apis.component';
import { ContentPricingComponent } from './content-pricing/content-pricing.component';
import { ContentUsageComponent } from './content-usage/content-usage.component';
import { ContentWorkflowComponent } from './content-workflow/content-workflow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexTableComponent } from './flex-table/flex-table.component';
import { KeyContainerComponent } from './key-container/key-container.component';
import { ContentApiKeysComponent } from './content-api-keys/content-api-keys.component';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DounutChartComponent } from './dounut-chart/dounut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MessageInterceptor } from '../interceptor/message.interceptor';
import { AuthInterceptorService } from '../interceptor/auth-interceptor.interceptor';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { WorkflowApiComponent } from './workflow-api/workflow-api.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { WorkflowDetialsComponent } from './workflow-detials/workflow-detials.component';
import { ApexLineChartComponent } from './apex-line-chart/apex-line-chart.component';
// import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { ChartjsModule } from 'ngx-chartjs';
// import { AuthInterceptor } from '../interceptor/auth.interceptor'; // Import your authentication interceptor here
// import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from 'ng2-charts';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ContentRecomWorkflowComponent } from './content-recom-workflow/content-recom-workflow.component';
import { WorkflowCardComponent } from './workflow-card/workflow-card.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { RunComponent } from './run/run.component';
import { HistoryComponent } from './history/history.component';
import { WfRunComponent } from './wf-run/wf-run.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SafeJsonPipe } from 'angular2-prettyjson/src/json.pipe';

@NgModule({
  declarations: [
    ApiCardComponent,
    ComponentParentComponent,
    ContentApiLibComponent,
    ContentHelpComponent,
    ContentMyApisComponent,
    ContentPricingComponent,
    ContentUsageComponent,
    ContentWorkflowComponent,
    DashboardComponent,
    FlexTableComponent,
    KeyContainerComponent,
    ContentApiKeysComponent,
    ContentDashboardComponent,
    DashboardNavComponent,
    DounutChartComponent,
    LineChartComponent,
    ApiDetailsComponent,
    WorkflowApiComponent,
    JsonViewerComponent,
    WorkflowDetialsComponent,
    ApexLineChartComponent,
    TruncatePipe,
    SidebarComponent,
    AdminDashboardComponent,
    CustomerListComponent,
    ContentRecomWorkflowComponent,
    WorkflowCardComponent,
    MessageModalComponent,
    RunComponent,
    HistoryComponent,
    WfRunComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgxGraphModule,
    NgFlowchartModule,
    NgChartsModule,
    Daterangepicker,
    PrettyJsonModule,
    // NgbModule
    // NgApexchartsModule
    // BaseChartDirective
    

  ],
  exports:[LineChartComponent],
  providers: [
    // provideCharts(withDefaultRegisterables()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, // Add AuthInterceptorService here
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true }, // Your MessageInterceptor
    // { provide: JsonPipe, useClass: SafeJsonPipe }
  ],
  bootstrap: [DashboardComponent]
})
export class ComponentModule { }
