import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineDataPoint } from 'src/app/models/line.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss', './mobile.scss']
})
export class AdminDashboardComponent implements OnInit {

  userDetails: any;
  public data: any;
  public selectedSliceLabel: string = "No Selection";
  public selectedSliceValue: string = "0%";
  dashboard: any = {};
  messages: string[] = [];
  startDate = this.formatDate(new Date());
  endDate = this.formatDate(new Date());
  start: any;
  end: any;
  credits: any = {};
  credit_data: any;
  selectedRange: string = 'today'; // Add selectedRange variable and initialize it with 'today'
  registeredAPIs: Number=0;

  activeCustomer: Number=0
  customerCounts =0
  totalBalance = 0
  totalApiHits = 0
  clientUsage:any = [];  


  chartLabels: string[]=[];
  label = "Hits today";
  lineChartData : any[]=[];


  recommendedAPIs: any = [];
  lineData: LineDataPoint[] = [];

  constructor(private userService: UserService, private messageService: MessagesService, private authService: AuthService, private router: Router) {

  }

  public OnSliceClick(e: any) {
    if (e.args.isSelected) {
      this.selectedSliceLabel = this.data[e.args.index].Label;
      this.selectedSliceValue = this.data[e.args.index].Value + "%";
    } else {
      this.selectedSliceLabel = "No Selection";
      this.selectedSliceValue = "0%";
    }
  }

  ngOnInit(): void {
    this.setDateRange(this.selectedRange)
    this.getDashboard();
    this.userDetails = this.authService.getUserData();
  }

  // ? calling the dashboard api
  getDashboard(startDate?: string, endDate?: string): void {
    // Call the service method to fetch all APIs
    this.userService.dashboard(startDate, endDate).subscribe(
      (dashboardResponse) => {
        console.log(startDate, endDate)
        console.log(dashboardResponse)
        this.dashboard = dashboardResponse.body;

        this.activeCustomer = this.dashboard.active_customer_count;
        this.customerCounts = this.dashboard.customer_counts;
        this.totalBalance = this.dashboard.total_balace
        this.totalApiHits = this.dashboard.total_api_hits

        this.lineChartData = this.dashboard.call.value
        this.chartLabels = this.dashboard.call.label
        this.clientUsage = this.dashboard.client_usage;

        console.log(this.dashboard);
        this.credits.left = this.dashboard.credits.used;
        this.credits.balance = this.dashboard.credits.balance;
        this.credits.total = this.credits.left + this.credits.balance;
        this.credit_data = [this.credits.left, this.credits.balance];
        this.registeredAPIs = this.dashboard.registered_apis
        this.recommendedAPIs = this.dashboard.recommended_apis
        // this.lineData = this.dashboard.calls
        // this.workflows = this.recommendedAPIs
        console.log(this.lineData);
        if (dashboardResponse.body && dashboardResponse.message && Array.isArray(dashboardResponse.message)) {
          this.messages = dashboardResponse.message;
          // Add messages to the message service
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });

          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }
      },
      (error) => {
        console.error('Error fetching APIs:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  setDateRange(tab: string): void {
    // Update startDate and endDate based on the selected tab
    switch (tab) {
      case 'today':
        this.start = new Date();
        this.end = new Date();
        break;
      case 'yesterday':
        this.start = new Date();
        this.start.setDate(this.start.getDate() - 1);
        this.end = new Date();
        this.end.setDate(this.end.getDate() - 1);
        break;
      case 'week':
        this.start = new Date();
        this.start.setDate(this.start.getDate() - this.start.getDay());
        this.end = new Date();
        this.end.setDate(this.end.getDate() + (6 - this.end.getDay()));
        break;
      case 'month':
        this.start = new Date();
        this.start.setDate(1);
        this.end = new Date(this.start.getFullYear(), this.start.getMonth() + 1, 0);
        break;
      default:
        this.start = new Date();
        this.end = new Date();
        break;
    }

    this.startDate = this.formatDate(this.start);
    this.endDate = this.formatDate(this.end);
    console.log(this.startDate, this.endDate);
    this.selectedRange = tab; // Update selectedRange
    this.applyFilters();
  }

  applyFilters(): void {
    this.getDashboard(this.startDate, this.endDate); // Call getDashboard with startDate and endDate
  }

  goToUsers(): void{
    this.router.navigate(["admin-user"]);
  }
  
  goToAPILib(): void{
    this.router.navigate(["api-lib"]);
  }
  
  goToAPIDetail(apiId:any){
  
    this.router.navigate(['/api', apiId]);
  }
  


}
