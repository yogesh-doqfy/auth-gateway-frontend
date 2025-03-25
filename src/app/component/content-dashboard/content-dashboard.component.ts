import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { LineDataPoint } from 'src/app/models/line.model'
import { contours } from 'd3';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss', "./mobile.scss"]
})
export class ContentDashboardComponent implements OnInit {
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
  selectedRange = 'today'; // Add selectedRange variable and initialize it with 'today'
  registeredAPIs: Number=0;

  chartLabels: string[]=[];
  label = "Hits today";
  lineChartData : any[]=[];
  lastTransaction: any;


  recommendedAPIs: any =[];
  lineData: LineDataPoint[] = [];

  paymentEmail: string = "";
  paymentMobile: string = "";
  paymentAmount: Number=0;


  constructor(private userService: UserService, private messageService: MessagesService, private authService: AuthService, private router: Router, private walletService: WalletService) {

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
    // console.log(this.selectedRange)
    this.setDateRange(this.selectedRange)
    // this.getDashboard();
    this.userDetails = this.authService.getUserData();
  }

  // ? calling the dashboard api
  getDashboard(startDate?: string, endDate?: string): void {
    console.log("dashboard is calling")
    // if (!startDate){

    // }
    console.log(startDate)
    console.log(endDate)
    // Call the service method to fetch all APIs
    this.userService.dashboard(startDate, endDate).subscribe(
      (dashboardResponse) => {
        console.log(dashboardResponse)
        // console.log(startDate, endDate)

        // console.log(dashboardResponse)
        this.dashboard = dashboardResponse.body;
        // console.log(this.dashboard);
        if (this.dashboard.credits){

          this.credits.left = this.dashboard.credits.used;
          this.credits.balance = this.dashboard.credits.balance;
          this.credits.total = this.credits.left + this.credits.balance;
          this.credit_data = [this.credits?.left, this.credits?.balance];
        }
          this.registeredAPIs = this.dashboard.registered_apis
        this.recommendedAPIs = this.dashboard?.recommended_apis
        // this.lineData = this.dashboard.calls
        this.lineChartData = this.dashboard?.call.value
        this.chartLabels = this.dashboard?.call.label
        this.lastTransaction = this.dashboard.last_transaction
        // this.workflows = this.recommendedAPIs
        // console.log(this.lineData);
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

goToMyApis(recommend=false): void{
  if (recommend){
    this.router.navigate(['my-apis'], { queryParams: { section: 'recommend-api' } });
  }else{
    this.router.navigate(["my-apis"]);
  }

}



goToAPIDetail(apiId:any){

  this.router.navigate(['/api', apiId]);
}


goToTransactionHistory(){

  this.router.navigate(["transaction-history"]);
}


callTransactionModal(){
  this.paymentEmail = this.userDetails.email
  this.paymentMobile = this.userDetails.mobile 
}



createTransaction(){
    let payload = {
      email: this.paymentEmail,
      mobile: this.paymentMobile,
      amount: this.paymentAmount
    }


    this.walletService.createTransaction(payload).subscribe(
      (response) => {
        console.log(response.body)
        if (response.body && response.message && Array.isArray(response.message)) {
          this.messages = response.message;
          // Add messages to the message service
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });

          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }},
      (error) => {
        console.error('Error fetching APIs:', error);
      }
    );
  
}



}
