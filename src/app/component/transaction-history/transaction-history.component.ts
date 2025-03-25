import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  messages: string[] = [];
  titles = ["Transaction Id", "Amount", "Credits", "Date"];
  datas: any[] = [];
  paginator: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;  
  response: any[] = [];

  constructor(private messageService: MessagesService, private walletService: WalletService) { }

  ngOnInit(): void {
    this.getTransactionHistory()
  }

  getColumnWidth() {
    return 100 / this.titles.length;
  }

  isBoolean(item: any): boolean {
    return typeof item === 'boolean';
  }

  getStatusColor(status: boolean): string {
    return status ? 'green' : 'red';
  }

  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  
  
  }
  getTransactionHistory(startDate?: string, endDate?: string) {

    const params: any = {   
      page: this.currentPage, // Pass the current page as a parameter
      page_size: this.itemsPerPage, // Pass the items per page as a parameter
    };

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }
    this.walletService.getTransactionHistory(params).subscribe(
      (response) => {
        if (response.body) {
          this.response = response.body
          this.datas = [];
          response.body.forEach((data:any) => {
            // Structure each item in the data array similar to the datas array
            const transactionData = [
              data.order_id,
              `Rs ${data.amount}`,
              `${data.amount} Credits`,
              this.formateDate(data.created),
              // data.status_code
            ];
            this.datas.push(transactionData);
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


  onPageChange(page: number): void {
    this.currentPage = page;
    this.getTransactionHistory();
  }

  onNextPageChange(): void {
    this.currentPage = this.currentPage + 1;
    this.getTransactionHistory();
  }

  onPreviousPageChange(): void {
    this.currentPage = this.currentPage - 1;
    this.getTransactionHistory();
  }




}
