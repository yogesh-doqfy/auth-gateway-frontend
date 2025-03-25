import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.scss']
})
export class ApiCardComponent implements OnChanges {
  message = ""
  messages = []
  isChecked = true
  @Input() api: any; 
  @Input() index: any; 
  isLoader = false;
  // @Output() switchChange = new EventEmitter<{ index: number, event: Event }>();


  constructor(private router: Router, private apiService: ApiService, private messageService: MessagesService ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // If the 'api' input changes, update the 'isChecked' property accordingly
    if ('api' in changes && !changes['api'].firstChange) {
      this.isChecked = this.api.is_subscribed;
    }
  }


  goToAPIDetail(apiId:any){
    console.log("calling routing")
    this.router.navigate(['/api', apiId]);
  }


  closeModal(){
    console.log(this.api.is_subscribed, this.isChecked)
this.isChecked = this.api.is_subscribed
  }

getMessage(){
console.log(this.api.is_subscribed, this.isChecked)
  if (this.api.is_subscribed){
    
    this.message = "Do you want to unsubscribe this API ?"
  }else{
    this.message = "Do you want to subscribe this API ?"
  }
  console.log(this.message)
}




  handleSwitchChange(api_id:number, index: number): void {
    this.apiService.subscribeToAPI(api_id).subscribe(
      (response) => {
        this.api.is_subscribed = response.body.is_active
        this.isChecked = this.api.is_subscribed
        console.log(response.body.is_active)
        console.log(response.message)
        if (response.body && response.message && Array.isArray(response.message)) {
          this.isLoader = true;
          this.messages = response.message;
          
          this.messages.forEach(message => {
            this.messageService.addMessage(message);
          });
          setTimeout(() => {
            this.messages = [];
            this.isLoader=false;
          }, 2000);
        }
      },
      (error) => {
        // this.isLoader=false

        console.error('Error fetching APIs:', error);
        // Handle errors here
      }
      );


    }





}
