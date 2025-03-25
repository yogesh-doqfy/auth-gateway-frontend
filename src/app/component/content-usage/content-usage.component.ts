import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-content-usage',
  templateUrl: './content-usage.component.html',
  styleUrls: ['./content-usage.component.scss', './mobile.scss']
})
export class ContentUsageComponent implements OnInit {

  usage: any[] = [];
  messages: string[] = [];
  datas: any[] = [];
  paginator: any = {};
  sectors:any;
  sector="";
  currentPage: number = 1;
  itemsPerPage: number = 10;  

  constructor(private apiService: ApiService, private messageService: MessagesService, private userService: UserService, private daterangepickerOptions: DaterangepickerConfig) { }

  ngOnInit(): void {
    this.getAPIUsage()
    this.getSectors()


  }

  searchText: string = "";

  titles = [
    "API Service",
    "Used Credits",
    "API Calls",
    "Amount Spend",
    "Status"
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
  


  getAPIUsage(startDate?: string, endDate?: string) {
    const params: any = {   
      page: this.currentPage, // Pass the current page as a parameter
      page_size: this.itemsPerPage, // Pass the items per page as a parameter
    };
    if (this.sector) {
      // Add the sector parameter to the params object
      params.sector = this.sector;
  }

  if (this.searchText){
    params.search = this.searchText
  }

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }
    this.apiService.getAPIUsage(params).subscribe(
      (response) => {
        if (response.body) {
          this.usage = response.body;
          this.datas = [];
          this.usage.forEach(usg => {
            // Structure each item in the data array similar to the datas array
            const apiData = [
              usg.name,
              `${usg.credits} Credits`,
              `${usg.calls} Calls`,
              `Rs. ${usg.amount}`,
              usg.is_subscribed
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


  public daterange: any = {};
 
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };
 
  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);
 
    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;
    const startDate = moment(value.start).format('YYYY-MM-DD');
    const endDate = moment(value.end).format('YYYY-MM-DD');
 
    // use passed valuable to update state
    this.daterange.start = startDate;
    this.daterange.end = endDate;
    this.daterange.label = value.label;
    // console.log(this.daterange)
    this.getAPIUsage(startDate, endDate);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAPIUsage();
  }

  onNextPageChange(): void {
    this.currentPage = this.currentPage + 1;
    this.getAPIUsage();
  }

  onPreviousPageChange(): void {
    this.currentPage = this.currentPage - 1;
    this.getAPIUsage();
  }




  clearSelection(){
    this.sector = "";
    this.getAPIUsage()
  }


  downloadExcel(data: any[], filename: string): void {
    // Get the keys (titles)
    const keys = Object.keys(data[0]);

    // Convert JSON data to array of arrays with keys as first row
    const dataArray: any[][] = [];
    dataArray.push(keys); // Add keys as first row
    data.forEach(item => {
      const row = keys.map(key => item[key]);
      dataArray.push(row);
    });

    // Create worksheet and workbook
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save and download the file
    XLSX.writeFile(wb, filename + '.xlsx');
  }
  // Example usage
  downloadData(): void {
    this.downloadExcel(this.usage, 'data'); // Pass the data array and filename
  }


}
