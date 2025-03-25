import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-pricing',
  templateUrl: './content-pricing.component.html',
  styleUrls: ['./content-pricing.component.scss', './mobile.scss']
})
export class ContentPricingComponent implements OnInit {
  messages: string[] = [];
  datas: any[] = [];
pricing: any[] = [];
sectors: string[] = [];
sector="";
currentPage: number = 1;
itemsPerPage: number = 10;  
paginator: any = {};


  constructor(private apiService: ApiService, private messageService: MessagesService, private userService: UserService,  private daterangepickerOptions: DaterangepickerConfig) { }

  ngOnInit(): void {
    this.getAPIPricing()
    this.getSectors()


  }

  searchText: string = "";
  
  titles = [
    "API Service",
    "Credits",
    "API Calls",
    "Amount per call"
  ]


  getSectors(){

    this.userService.getSector().subscribe(
      (response) => {
        this.sectors =  response.body
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
  



  getAPIPricing(startDate?: string, endDate?: string) {
    const params: any = {   
      page: this.currentPage, // Pass the current page as a parameter
      page_size: this.itemsPerPage, // Pass the items per page as a parameter
    };
    if (this.sector) {
      // Add the sector parameter to the params object
      params.sector = this.sector;
  }
  if (this.searchText){
    params.search = this.searchText;
  }

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }

    this.apiService.getAPIPricing(params).subscribe(
      (response) => {
        if (response.body) {
          this.pricing = response.body;
          this.datas = []
          this.pricing.forEach(prc => {
            // Structure each item in the data array similar to the datas array
            const apiData = [
              prc.name,
              `${prc.credits} Credits`,
              `${prc.calls} Calls`,
              `Rs. ${prc.amount}`
            ];
            this.datas.push(apiData);
          });

          if (response.pagination){
            this.paginator = response.pagination
          }

          // Check if response.message exists and is an array
          if (Array.isArray(response.message)) {
            this.messages = response.message;

            // Add messages to the message service
            this.messages.forEach(message => {
              this.messageService.addMessage(message);
            });

            // Automatically remove messages after 10 seconds
            setTimeout(() => {
              this.messages = [];
            }, 10000);
          }
        }
      },
      (error) => {
        console.error('Error fetching APIs:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAPIPricing();
  }

  onNextPageChange(): void {
    this.currentPage = this.currentPage + 1;
    this.getAPIPricing();
  }

  onPreviousPageChange(): void {
    this.currentPage = this.currentPage - 1;
    this.getAPIPricing();
  }


  public daterange: any = {};
 
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };
 
  public selectedDate(value: any, datepicker?: any) {
    console.log(value);
 
    const startDate = moment(value.start).format('YYYY-MM-DD');
    const endDate = moment(value.end).format('YYYY-MM-DD');
 
    // use passed valuable to update state
    this.daterange.start = startDate;
    this.daterange.end = endDate;
    this.daterange.label = value.label;
    this.getAPIPricing(startDate, endDate);
  }


  clearSelection(){
    this.sector = "";
    this.getAPIPricing()
  }



}
