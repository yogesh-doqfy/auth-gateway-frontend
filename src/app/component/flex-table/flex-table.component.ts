import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-flex-table',
  templateUrl: './flex-table.component.html',
  styleUrls: ['./flex-table.component.scss', './mobile.scss']
})
export class FlexTableComponent implements OnInit {
messages = [];
  constructor(private userService:UserService, private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  @Input() titles: any = [];
  @Input() datas: any = [];
  @Input() isWallet= false;
walletId:Number = 0;
user:any = {};

add_credits: any= 0;
add_credits_status:Boolean = false;



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

  changeWalletId(wallet_id:Number){
    console.log(wallet_id)
  this.walletId = wallet_id

  this.user = this.getDataById(this.walletId)
  this.disable_add_credits()

  }



  getDataById(id: Number): any[] | null {
    const userData = this.datas.find((user: any[]) => user[0] === id);
    if (userData) {
      return userData;
    } else {
      return null;
    }
  }



  updateWallet() {
    this.user[4] = JSON.parse(this.user[4]) + JSON.parse(this.add_credits)    
    const params = {
      user_id: this.user[0],
      amount: JSON.parse(this.user[4])
    };    
    this.userService.updateWallet(params).subscribe(
      (response) => {
        this.messages = response.message;
        this.messages.forEach(message => {
          this.messageService.addMessage(message);
        });
        setTimeout(() => {
          this.messages = [];

        }, 1000);
      },
      (error) => {
        if (error.error.message && Array.isArray(error.error.message)) {
          this.messages = error.error.message;
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
          setTimeout(() => {
            this.messages = [];
          }, 1000);
        }
        console.error('Login failed:', error);
      }
    );

    this.add_credits_status = false
  }

  

  enable_add_credits(){
    this.add_credits_status = true;
  }

  disable_add_credits(){
    this.add_credits_status = false;
  }



}

