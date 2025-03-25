import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { WebflowService } from 'src/app/services/webflow.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  messages = [];
  titles = [
    "API Name",
    "Credits",
    "Date",
    "status",
    ""
  ]
  // var JSON: any;
  paginator: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;  
  response: any[] = [];
  modalDetail: any = {};
  apiHistory = true;

  datas: any[] = [];

  constructor(private apiService:ApiService, private messageService: MessagesService, private wfs: WebflowService) { }

  ngOnInit(): void {

    const path = window.location.pathname;

    if (path.includes('api')){
      this.apiHistory = true
      // console.log(isApiPath)
    }else{
      this.apiHistory = false
    }


    this.getAPIHistory()
    // JSON.stringify()
  }

  isBoolean(item: any): boolean {
    return typeof item === 'boolean';
  }


  isNumber(item: any): boolean{
    return typeof item === "number";
  }

  formateDate(dateString:string){
    const date = new Date(dateString);

const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear().toString().slice(2);

const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
return formattedDate
  }

  getStatusColor(status: number): string {
    const validStatusCodes: number[] = [200, 201, 100];

    if (validStatusCodes.includes(status)) {
        return 'green';
    } else { 
        return 'red';
    }
}
  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }

  getColumnWidth() {
    return 100 / this.titles.length;
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAPIHistory();
  }

  onNextPageChange(): void {
    this.currentPage = this.currentPage + 1;
    this.getAPIHistory();
  }

  onPreviousPageChange(): void {
    this.currentPage = this.currentPage - 1;
    this.getAPIHistory();
  }


  callModal(index:number){
    console.log(this.response[index])
    this.modalDetail = this.response[index];
    console.log(this.modalDetail)
  }



  getParamValue(param:any){
    console.log(param)
    if (param.path){
      const keys = param.path.split('.');
      let currentObj = this.modalDetail.payload;      
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
          console.error('Invalid path or missing keys');
          return;
        }
      }


    const lastKey = keys[keys.length - 1];
    
    // console.log(currentObj)
    // Get the value corresponding to the last key in currentObj
    const value = currentObj[lastKey];
      

      // this.modalDetail.payload[param.name] = value;
      return value

  }else{
    console.log("value", this.modalDetail.payload[param.name])
    return this.modalDetail.payload[param.name]
  }
}



getResponseValue(param:any){
  console.log(param)
  if (param.path){
    const keys = param.path.split('.');
    let currentObj = this.modalDetail.response;      
    for (let i = 0; i < keys.length - 1; i++) {
      currentObj = currentObj[keys[i]];
      if (!currentObj) {
        console.error('Invalid path or missing keys');
        return;
      }
    }


  const lastKey = keys[keys.length - 1];
  
  // console.log(currentObj)
  // Get the value corresponding to the last key in currentObj
  const value = currentObj[lastKey];
    

    // this.modalDetail.payload[param.name] = value;
    return value

}else{
  console.log("value", this.modalDetail.response[param.name])
  return this.modalDetail.response[param.name]
}
}




  getAPIHistory(startDate?: string, endDate?: string) {
    if (!this.apiHistory){
      this.getWFHistory()
      return
    }

    const params: any = {   
      page: this.currentPage, // Pass the current page as a parameter
      page_size: this.itemsPerPage, // Pass the items per page as a parameter
    };

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }
    this.apiService.getAPIHistory(params).subscribe(
      (response) => {
        if (response.body) {
          this.response = response.body
          this.datas = [];
          response.body.forEach((data:any) => {
            // Structure each item in the data array similar to the datas array
            const apiData = [
              data.api,
              `${data.credits} Credits`,
              // `Rs. ${usg.amount}`,
              this.formateDate(data.created),
              data.status_code
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



  getWFHistory(startDate?: string, endDate?: string) {
    const params: any = {   
      page: this.currentPage, // Pass the current page as a parameter
      page_size: this.itemsPerPage, // Pass the items per page as a parameter
    };

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }
    this.wfs.getWFHistory(params).subscribe(
      (response) => {
        if (response.body) {
          this.response = response.body
          this.datas = [];
          response.body.forEach((data:any) => {
            // Structure each item in the data array similar to the datas array
            const apiData = [
              data.api,
              `${data.credits} Credits`,
              // `Rs. ${usg.amount}`,
              this.formateDate(data.created),
              data.status_code
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



  // Inside your HistoryComponent class

stringifyPayload(payload: any): string {
  return JSON.stringify(payload);
 }


}
